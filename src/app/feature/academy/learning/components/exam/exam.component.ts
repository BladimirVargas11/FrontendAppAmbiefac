import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { Response } from 'src/app/feature/components/models/response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer, Question } from '../../shared/models/QuestionModels';
import { AnswerCorrect, AnswerRespon, answers, responseAnswer } from '../../shared/models/answerResponse';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  @Input() rutaId: number = 0;
  @Input() registrationId: number = 0;
  data: any;
  examForm: FormGroup;
  questions: Question[] = [];
  controlErrorDisplay: { [key: string]: boolean } = {};
  selectedAnswers: { [key: string]: Answer } = {};
  submitted: boolean = false;
  resultAnswer: AnswerCorrect = responseAnswer;
  topicId: any;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private service: LearningService,
    private fb: FormBuilder,
    private auth: AuthenticationService) {
    this.examForm = this.fb.group({});
  }

  ngOnInit(): void {
    console.log("ID REGISTRO:", this.registrationId);

    setTimeout(() => {
      console.log("examen", this.rutaId);
      this.getParameters();
      this.loadQuestions();
    }, 1000);
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
        answers.push({ id: selectedAnswerId });
        this.selectedAnswers[`question${question.questionsId}`] = selectedAnswer;
      }
      console.log('Respuestas Seleccionadas:', this.selectedAnswers);
      console.log(answers);
      this.enviarRespuestas(answers);
    } else {
      console.log('Formulario no válido. Asegúrate de responder todas las preguntas.');
    }

  }

  private enviarRespuestas(answers: { id: any; }[]) {
    this.service.postExam({ answersIds: answers, idTopic: this.topicId, idClient: this.auth.getUserId() }).subscribe((response: any) => {
      this.resultAnswer = response.data;
    });
  }

  getResultAnswers(): any[] {
    return this.resultAnswer.answers;
  }
  private findOrDefault<T>(array: T[], predicate: (element: T) => boolean, defaultValue: T): T {
    const foundElement = array.find(predicate);
    return foundElement !== undefined ? foundElement : defaultValue;
  }
  retryExam() {
    this.resultAnswer = responseAnswer;
    Object.keys(this.examForm.controls).forEach(key => {
      this.controlErrorDisplay[key] = false;
    });

    this.examForm.reset();
  }
  get getScore(): number {
    return Math.round(this.resultAnswer.score / 100) * 100;
  }

  private getParameters() {
    this.route.paramMap.subscribe(params => {
      
      this.topicId = parseInt(params.get('parentId') ?? '0', 10);

    });
  }
}
