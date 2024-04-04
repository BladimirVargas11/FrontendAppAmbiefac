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
    private http: HttpService<any>) {
  }

  postSubtopic(subtopic: any): Observable<any> {
    return this.http.post(`${this.url}subtopic/save`, subtopic, true)
  }
  getSubTopicById(id: number): Observable<SubTopicModel[]> {
    return this.http.get(`${this.url}subtopic/byTopic/${id}`)
  }
  updateSubtopic(id: number, selectedSubtema: any): Observable<any> {
    const updatedSubtopic = {
      id: id,
      name: selectedSubtema.name // Asumiendo que el nombre del subtema está en la propiedad "name"
    };
    return this.http.put(`${this.url}subtopic/update/${id}`, updatedSubtopic, true, 'Actualización correcta');
  }
  
  deleteSubtopic(id: number,): Observable<any> {
    return this.http.delete(`${this.url}subtopic/delete/${id}`, true, 'Actualiacion correcta')
  }
}
