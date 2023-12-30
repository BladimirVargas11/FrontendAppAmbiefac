import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { Response } from 'src/app/feature/components/models/response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer, Question } from '../../shared/models/QuestionModels';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  rutaId: number = 0;
  data: any;
  examForm: FormGroup;
  questions: Question[] = [];
  selectedAnswers: { [key: string]: Answer } = {};
  submitted: boolean = false;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private service: LearningService,
    private fb: FormBuilder,) {
    this.examForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getParameters();
    this.loadQuestions();
  }

  private loadQuestions() {
    this.service.getExam(this.rutaId).subscribe((data: any) => {
      this.questions = data.data.questions;
      this.buildForm();
    });
  }

  private buildForm() {
    this.questions.forEach((question) => {
      this.examForm.addControl(
        `question${question.questionsId}`,
        this.fb.control('', Validators.required)
      );
    });
  }

  private getParameters() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id') ?? '0', 10);
      const parameter = params.get('queryParams') ?? '0';
      if (!isNaN(this.rutaId)) {
        console.log('PARAMETRO: ', parameter);
        this.service.getSubTopic(this.rutaId).subscribe((data: Response<any>) => {
          this.data = data.data
        })
      }
    });
  }

  isQuestionUnanswered(questionControlName: string): boolean {
    const control = this.examForm.get(questionControlName);
    return control && control.invalid && (control.touched || this.submitted) || false;
  }

  onSubmit() {
    const answers = []
    this.submitted = true;
    Object.values(this.examForm.controls).forEach(control => control.markAsTouched());
    if (this.examForm.valid) {
      this.selectedAnswers = {};
      for (const question of this.questions) {
        const selectedAnswerId = this.examForm.value[`question${question.questionsId}`];
        const selectedAnswer = this.findOrDefault(
          question.answers,
          (a) => a.id === selectedAnswerId,
          {} as Answer
        );
          answers.push({id:selectedAnswerId});
        this.selectedAnswers[`question${question.questionsId}`] = selectedAnswer;
      }
      console.log('Respuestas Seleccionadas:', this.selectedAnswers);
      console.log(answers);
      this.service.postExam(answers).subscribe();
    } else {
      console.log('Formulario no válido. Asegúrate de responder todas las preguntas.');
    }
    
  }

  private findOrDefault<T>(array: T[], predicate: (element: T) => boolean, defaultValue: T): T {
    const foundElement = array.find(predicate);
    return foundElement !== undefined ? foundElement : defaultValue;
  }
}
