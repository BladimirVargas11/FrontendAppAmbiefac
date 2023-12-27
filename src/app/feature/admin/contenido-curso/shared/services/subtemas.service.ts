import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';
import { SubTopicModel } from '../models/subTopicModel';

@Injectable({
  providedIn: 'root'
})
export class SubtemasService {
  entidad: string = 'cursos';
  url: string = environment.apiUrl;
  constructor(
    private http:HttpService<any>) {
  }

  postSubtopic(subtopic: any):Observable<any>{
    return this.http.post(`${this.url}subtopic/save`, subtopic, true)
  }
  getSubTopicById(id: number):Observable<SubTopicModel[]>{
    return this.http.get(`${this.url}subtopic/byTopic/${id}`)
  }

}
