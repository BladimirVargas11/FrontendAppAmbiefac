import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getTopicById(id: number): Observable<any> {
    return this.http.get(`${this.url}topic/${id}`)
  }
  putTopic(topic:any):Observable<any>{
    return this.http.put(`${this.url}topic/update/${topic.id}`, topic, true);
  }
 
}
