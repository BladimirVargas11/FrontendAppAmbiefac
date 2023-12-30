import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamenService } from '../../shared/services/examen.service';


@Component({
  selector: 'app-agregar-preguntas',
  templateUrl: './agregar-preguntas.component.html',
  styleUrls: ['./agregar-preguntas.component.scss']
})
export class AgregarPreguntasComponent implements OnInit {

  titulo: string = 'Agregar preguntas';
  question = { text: '', answers: [{ text: '', correct: false }], };
  preguntaForm!: FormGroup;
  preguntaConRespuestaCorrecta: boolean[] = [];
  formulario!: FormGroup;
  rutaId: number = 0;
  exm_id: number = 0;
  private originalData: any;

  get preguntas(): FormArray {
    return this.formulario.get('questions') as FormArray;
  }
  respuestaLog(respuesta: AbstractControl): any {
    return respuesta.get('answers') as FormArray

  }

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private service: ExamenService) { }

  ngOnInit(): void {
    this.getParams();
    this.inicializarFormulario();
    this.obtenerPreguntasDesdeEndpoint();
    this.hiden();
  }

  obtenerPreguntasDesdeEndpoint(showSpinner: boolean = true): void {
    if (this.exm_id) {
      if (showSpinner)
        this.spinner.show();

      this.service.obtenerPreguntasDesdeEndpoint(this.exm_id).subscribe(
        (data: any) => {
          this.actualizarFormularioConDatos(data.data);
          this.originalData = data.data;
        }
      );

    }
  }
  hiden = () => {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  actualizarFormularioConDatos(data: any): void {
    this.preguntas.clear();
    let index = 1
    for (const pregunta of data.questions) {
      const nuevaPregunta = this.fb.group({
        questionsId: pregunta.questionsId,
        questionStatement: [pregunta.questionStatement, Validators.required],
        answers: this.fb.array([]),
      });
      for (const respuesta of pregunta.answers) {
        const nuevaRespuesta = this.fb.group({
          id: respuesta.id,
          answerText: [respuesta.answerText, Validators.required],
          correct: respuesta.correct,
        });
        (nuevaPregunta.get('answers') as FormArray).push(nuevaRespuesta);
      }
      this.preguntas.push(nuevaPregunta);
    }
    this.formulario.updateValueAndValidity();
    this.spinner.hide();
  }
  private getParams() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id') ?? '0');
      this.exm_id = parseInt(params.get('examen') ?? '0');
    });
  }
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      idTopic: this.rutaId,
      questions: this.fb.array([], this.validateAtLeastOneCorrectAnswer()),
    });
    // Agregar una pregunta inicial
    this.agregarPregunta();
  }
  validateAtLeastOneCorrectAnswer(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (formArray instanceof FormArray) {
        const preguntaConRespuestaCorrecta: boolean[] = formArray.controls.map((control: AbstractControl) =>
          (control instanceof FormGroup) &&
          control.get('answers')?.value.some((answer: any) => answer.correct)
        );

        const hasCorrectAnswer = preguntaConRespuestaCorrecta.every(hasCorrect => hasCorrect);

        return hasCorrectAnswer ? null : { 'atLeastOneCorrectAnswer': true };
      }

      return null;
    };
  }

  crearPregunta(): FormGroup {
    return this.fb.group({
      questionStatement: ['', Validators.required],
      answers: this.fb.array([
        this.crearRespuesta(),
        this.crearRespuesta(),
        this.crearRespuesta(),
      ]),
    });
  }


  crearRespuesta(): FormGroup {
    return this.fb.group({
      id: [],
      answerText: ['', Validators.required],
      correct: false,
    });
  }

  agregarPregunta(): void {
    const nuevaPregunta = this.crearPregunta();
    nuevaPregunta.setValidators(this.validateAtLeastOneCorrectAnswer());
    this.preguntas.push(nuevaPregunta);
    this.formulario.updateValueAndValidity();
  }

  agregarRespuesta(preguntaIndex: number): void {
    const respuestas = this.preguntas.at(preguntaIndex).get('answers') as FormArray;
    respuestas.push(this.crearRespuesta());
    this.formulario.updateValueAndValidity();
  }

  eliminarRespuesta(preguntaIndex: number, respuestaIndex: number): void {
    const respuestas = this.preguntas.at(preguntaIndex).get('answers') as FormArray;
    respuestas.removeAt(respuestaIndex);
    this.formulario.updateValueAndValidity();
  }
  eliminarPregunta(preguntaIndex: number): void {
    this.preguntas.removeAt(preguntaIndex)
  }

  getPreguntasSinRespuestaCorrecta(): number[] {
    const preguntasSinRespuestaCorrecta: number[] = [];
    this.preguntas.controls.forEach((pregunta: AbstractControl, index: number) => {
      const respuestasCorrectas = pregunta.get('answers')?.value.filter((answer: any) => answer.correct);
      if (!respuestasCorrectas || respuestasCorrectas.length === 0) {
        preguntasSinRespuestaCorrecta.push(index);
      }
    });
    return preguntasSinRespuestaCorrecta;
  }

  findInvalidControl(formGroup: FormGroup | FormArray): AbstractControl | null {
    if (formGroup instanceof FormGroup) {
      const controls = formGroup.controls as { [key: string]: AbstractControl<any, any> };

      for (const controlName in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, controlName)) {
          const control = controls[controlName];

          if (control.invalid) {
            return control;
          }

          if (control instanceof FormGroup || control instanceof FormArray) {
            const nestedInvalidControl = this.findInvalidControl(control);
            if (nestedInvalidControl) {
              return nestedInvalidControl;
            }
          }
        }
      }
    } else if (formGroup instanceof FormArray) {
      for (let i = 0; i < formGroup.length; i++) {
        const control = formGroup.at(i);

        if (control && control.invalid) {
          return control;
        }

        if (control instanceof FormGroup || control instanceof FormArray) {
          const nestedInvalidControl = this.findInvalidControl(control);
          if (nestedInvalidControl) {
            return nestedInvalidControl;
          }
        }
      }
    }

    return null;
  }

  addSubTema = () => {
    this.validForm();
    if (this.formulario.valid) {
      (this.exm_id === 0) ? this.addNewExam() : this.updateExam();
      setTimeout(() => {
        this.obtenerPreguntasDesdeEndpoint();
      }, 1000);
    }
  };

  private updateExam() {
    const PreguntasModificadas = this.getPreguntasModificadas();
    const nuevasPreguntas = this.getNuevasPreguntasConNuevasRespuestas();
    const nuevasRespuestas = this.getNuevasRespuestas();
    const respuestasModificadas = this.getRespuestasModificadas();

    // console.log("Respuestas Modificadas", JSON.stringify(respuestasModificadas));
    if (respuestasModificadas.length > 0)
      this.service.putAnsawer(respuestasModificadas).subscribe();

    console.log("Nuevas respuestas", JSON.stringify(nuevasRespuestas));
    if (nuevasRespuestas.length > 0)
      this.service.postNewAnswers(nuevasRespuestas).subscribe();

    // console.log("Pregunts modificadas", JSON.stringify(PreguntasModificadas));
    if (PreguntasModificadas.length > 0)
      this.service.putQuestion(PreguntasModificadas).subscribe();
    // console.log("Nuevas preguntas", JSON.stringify(nuevasPreguntas));
    if (nuevasPreguntas.length > 0)
      this.service.postNewQuestion(nuevasPreguntas, this.exm_id).subscribe();
  }

  private addNewExam() {
    this.service.postExamen(this.formulario.value).subscribe();

  }
  private validForm() {
    this.formulario.markAllAsTouched();
    this.validReponseTrue();
    const invalidControl = this.findInvalidControl(this.formulario);
    if (invalidControl && 'focus' in invalidControl) {
      (invalidControl as any).focus();
    }
  }

  private validReponseTrue() {
    const preguntasSinRespuestaCorrecta = this.getPreguntasSinRespuestaCorrecta();
    if (preguntasSinRespuestaCorrecta.length > 0) {
      preguntasSinRespuestaCorrecta.forEach(index => {
        const preguntaControl = this.preguntas.at(index);
        preguntaControl?.get('questionStatement')?.setErrors({ 'atLeastOneCorrectAnswer': true });
      });
    } else {
      this.preguntas.controls.forEach((preguntaControl: AbstractControl) => {
        preguntaControl?.get('questionStatement')?.setErrors(null);
      });
    }
  }

  tieneRespuestaCorrecta(pregunta: AbstractControl): boolean {
    const respuestasCorrectas = pregunta.get('answers')?.value.filter((answer: any) => answer.correct);
    return !!respuestasCorrectas && respuestasCorrectas.length > 0;
  }

  private getNuevasPreguntasConNuevasRespuestas(): any[] {
    const nuevasPreguntas: any[] = [];
    this.preguntas.controls.forEach((pregunta: AbstractControl) => {
      const questionId = pregunta.get('questionsId')?.value;
      if (!questionId) {
        nuevasPreguntas.push({
          questionStatement: pregunta.get('questionStatement')?.value,
          answers: pregunta.get('answers')?.value.map((respuesta: any) => ({
            id: null,
            answerText: respuesta.answerText,
            correct: respuesta.correct,
          })),
        });
      }
    });
    return nuevasPreguntas;
  }

  private getNuevasRespuestas(): any[] {
    const nuevasRespuestas: any[] = [];

    // Recorrer las respuestas actuales
    this.preguntas.controls.forEach((pregunta: AbstractControl) => {
      const questionId = pregunta.get('questionsId')?.value;

      // Verificar si la pregunta ya existe
      if (questionId) {
        pregunta.get('answers')?.value.forEach((respuesta: any) => {
          const answerId = respuesta.id;

          // Verificar si es una nueva respuesta (no tiene id)
          if (!answerId) {
            nuevasRespuestas.push({
              questionID: questionId,
              answerText: respuesta.answerText,
              isCorrect: respuesta.correct,
            });
          }
        });
      }
    });

    return nuevasRespuestas;
  }
  private getPreguntasModificadas(): any[] {
    const preguntasModificadas: any[] = [];

    // Comparar las preguntas actuales con las originales
    this.preguntas.controls.forEach((pregunta: AbstractControl) => {
      const questionId = pregunta.get('questionsId')?.value;
      const originalPregunta = this.originalData.questions.find((originalPregunta: any) => originalPregunta.questionsId === questionId);

      // Verificar si la pregunta ha sido modificada
      if (originalPregunta && !this.preguntasSonIguales(pregunta.value, originalPregunta)) {
        preguntasModificadas.push({
          id: questionId,
          questionStatement: pregunta.get('questionStatement')?.value,
        });
      }
    });

    return preguntasModificadas;
  }
  private preguntasSonIguales(preguntaA: any, preguntaB: any): boolean {
    return preguntaA.questionStatement === preguntaB.questionStatement;
  }
  // Arreglar 
  private getRespuestasModificadas(): any[] {
    const respuestasModificadas: any[] = [];
    // Comparar las respuestas actuales con las originales
    this.preguntas.controls.forEach((pregunta: AbstractControl) => {
      pregunta.get('answers')?.value.forEach((respuesta: any) => {
        const answerId = respuesta.id;
        const originalRespuesta = this.originalData.questions
          .find((originalPregunta: any) => originalPregunta.questionsId === pregunta.get('questionsId')?.value)
          ?.answers.find((originalRespuesta: any) => originalRespuesta.id === answerId);

        // Verificar si la respuesta ha sido modificada
        if (originalRespuesta && !this.areRespuestasIguales(respuesta, originalRespuesta)) {
          respuestasModificadas.push({
            id: answerId,
            answerText: respuesta.answerText,
            correct: respuesta.correct,
          });
        }
      });
    });

    return respuestasModificadas;
  }
  private areRespuestasIguales(respuestaA: any, respuestaB: any): boolean {
    // Comparar las propiedades relevantes de las respuestas
    return (
      respuestaA.answerText === respuestaB.answerText &&
      respuestaA.correct === respuestaB.correct
    );
  }
}
