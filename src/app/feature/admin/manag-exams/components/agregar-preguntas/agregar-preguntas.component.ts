import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-agregar-preguntas',
  templateUrl: './agregar-preguntas.component.html',
  styleUrls: ['./agregar-preguntas.component.scss']
})
export class AgregarPreguntasComponent implements OnInit {

    titulo: string = 'Agregar preguntas';
    question = {
      text: '',
      answers: [{ text: '', correct: false }],
    };
    preguntaForm!: FormGroup;
    
  
    formulario!: FormGroup;
  
    
    get preguntas(): FormArray {
      return this.formulario.get('preguntas') as FormArray;
    }
    respuestaLog(respuesta:AbstractControl):any{
     return respuesta.get('respuestas') as FormArray
  
    }
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.inicializarFormulario();
    }
  
    inicializarFormulario(): void {
      this.formulario = this.fb.group({
        preguntas: this.fb.array([]),
      });
      // Agregar una pregunta inicial
      this.agregarPregunta();
    }
  
    crearPregunta(): FormGroup {
      return this.fb.group({
        pregunta: ['', Validators.required],
        respuestas: this.fb.array([
          this.crearRespuesta(),
          this.crearRespuesta(),
          this.crearRespuesta(),
        ]),
      });
    }
  
    crearRespuesta(): FormGroup {
      return this.fb.group({
        texto: ['', Validators.required],
        correcta: false,
      });
    }
  
    agregarPregunta(): void {
      this.preguntas.push(this.crearPregunta());
    }
  
    agregarRespuesta(preguntaIndex: number): void {
      const respuestas = this.preguntas.at(preguntaIndex).get('respuestas') as FormArray;
      respuestas.push(this.crearRespuesta());
    }
  
    eliminarRespuesta(preguntaIndex: number, respuestaIndex: number): void {
      const respuestas = this.preguntas.at(preguntaIndex).get('respuestas') as FormArray;
      respuestas.removeAt(respuestaIndex);
    }
    eliminarPregunta(preguntaIndex: number): void {
      this.preguntas.removeAt(preguntaIndex)
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
  
      this.formulario.markAllAsTouched();
      if (this.formulario.valid) {
        console.log(this.formulario.get('preguntas')?.value);
      } else {
        const invalidControl = this.findInvalidControl(this.formulario);
        if (invalidControl && 'focus' in invalidControl) {
          (invalidControl as any).focus();
        }
      }
    };
  
}
