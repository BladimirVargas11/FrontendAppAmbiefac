import { Injectable } from '@angular/core';
import { LocalService } from 'src/app/Core/services/local.service';
import { Subtema } from '../../../cursos/shared/models/subTemasModels';
import { SubTema, SubTemaModel } from '../models/subtemas';
import { Observable } from 'rxjs/internal/Observable';
import { GenericLocalService } from 'src/app/Core/services/generic-local.service';
import { CursoForm, cursos } from '../../../cursos/shared/models/cursosModels';
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
    private repository: GenericLocalService<CursoForm>,
    private http:HttpService<any>) {
    repository.localStorageKey = "cursos"
  }

  postSubtopic(subtopic: any):Observable<any>{
    return this.http.post(`${this.url}subtopic/save`, subtopic, true)
  }
  getSubTopicById(id: number):Observable<SubTopicModel[]>{
    return this.http.get(`${this.url}subtopic/byTopic/${id}`)
  }

}
