import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Core/services/http.service';
import { Response } from 'src/app/feature/components/models/response';
import { Topìc } from 'src/app/feature/components/models/topic';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  url = environment.apiUrl;

  constructor(private http: HttpService<any>) { }

  getSubTopic(id: number): Observable<Response<any>> {
    return this.http.get(`${this.url}information/bySubtopic/${id}`)
  }
  getTopic(id: number): Observable<Response<Topìc>> {
    return this.http.get(`${this.url}topic/${id}`)
  }
  getExam(id: number): Observable<Response<Topìc>> {
    return this.http.get(`${this.url}exam/questions/${id}`)
  }
  postExam(body: any, id:number): Observable<any> {
    console.log("Respuesta",JSON.stringify({ answersIds: body }));
    // return this.http.get('');
    return this.http.post(`${this.url}exam/valid-answers/${id}`, { answersIds: body }, true);
  }
  getValidInscription(idClient: number, idTopic:number): Observable<Response<any>> {
    return this.http.get(`${this.url}client-topic/courses/${idClient}/${idTopic}`)
  }
}
