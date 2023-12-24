import { Injectable } from '@angular/core';
import { Curso, CursoForm, cursos } from '../models/cursosModels';
import { LocalService } from 'src/app/Core/services/local.service';
import { Observable, of } from 'rxjs';
import { GenericLocalService } from 'src/app/Core/services/generic-local.service';
import { HttpService } from 'src/app/Core/services/http.service';
import { TopicModel } from '../models/topicModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  url: string = environment.apiUrl;
  constructor( private http:HttpService<any>) {}

  getAllTopic():Observable<TopicModel[]>{
    return this.http.get(`${this.url}topic/all`, false)
  }
  postTopic(topic:any):Observable<any>{
    return this.http.post(`${this.url}topic/save`, topic, true)
  }
  
    deletTopic(id:number):Observable<any>{
    return  this.http.delete(`${this.url}topic/delete/${id}`)
  }

 
}
