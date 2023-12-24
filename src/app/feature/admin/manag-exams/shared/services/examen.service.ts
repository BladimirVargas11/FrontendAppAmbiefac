import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';
import { TopicModel } from '../../../cursos/shared/models/topicModel';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  obtenerPreguntasDesdeEndpoint(rutaId: number):Observable<any> {
    return this.http.get(`${this.url}exam/questions/${rutaId}`)
  }

  url: string = environment.apiUrl;
  constructor( private http:HttpService<any>) {}

  getAllTopic():Observable<any>{
    return this.http.get(`${this.url}topic/all`, false)
  }

  postExamen(examen:any):Observable<any>{
    return this.http.post(`${this.url}exam/save`, examen, true);
  }
  
}
