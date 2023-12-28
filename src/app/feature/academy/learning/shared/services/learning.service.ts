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

  constructor(private http:HttpService<any>) { }

  getSubTopic(id:number):Observable<Response<any>>{
    return this.http.get(`${this.url}information/bySubtopic/${id}`)
  }
  getTopic(id:number):Observable<Response<Topìc>>{
    return this.http.get(`${this.url}topic/${id}`)
  }
}
