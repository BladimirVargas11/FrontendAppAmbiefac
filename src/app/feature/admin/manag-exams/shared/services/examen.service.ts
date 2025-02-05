import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';
import { TopicModel } from '../../../cursos/shared/models/topicModel';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  obtenerPreguntasDesdeEndpoint(rutaId: number): Observable<any> {
    return this.http.get(`${this.url}exam/questions/${rutaId}`)
  }

  url: string = environment.apiUrl;
  constructor(private http: HttpService<any>) { }

  getAllTopic(): Observable<any> {
    return this.http.get(`${this.url}topic/all`, false)
  }

  postExamen(examen: any): Observable<any> {
    return this.http.post(`${this.url}exam/save`, examen, true);
  }

  postNewQuestion(questions: any, id: number): Observable<any> {
    const updatedQuestions = {
      questionStatement: questions[0].questionStatement,
      answers: questions[0].answers
    };
    return this.http.post(`${this.url}exam/new-questions/${id}`, updatedQuestions, true);
  }
  putQuestion(questions: any): Observable<any> {
    return this.http.put(`${this.url}exam/update-questions`, { questions: questions }, true);
  }
  putAnsawer(answers: any): Observable<any> {
    return this.http.put(`${this.url}exam/update-answers`, { answers: answers }, true);
  }
  postNewAnswers(answers: any): Observable<any> {
    return this.http.post(`${this.url}exam/new-answers`, answers, true);
  }

  deleteAnswers(answers: any): Observable<any> {
    return this.http.delete(`${this.url}exam/delete-answer/${answers}`, true);
  }
  deleteQuestion(question: any): Observable<any> {
    return this.http.delete(`${this.url}exam/delete-question/${question}`, true);
  }
}
