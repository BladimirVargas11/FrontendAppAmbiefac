import { Injectable } from '@angular/core';
import { InformacionTema, informacionTemaData } from '../models/informacion';
import { Observable, Observer, of } from 'rxjs';
import { ContenidoItem } from '../models/contenido';
import { CursoForm, cursos } from '../../../cursos/shared/models/cursosModels';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  entidad = 'contenido';
  url: string = environment.apiUrl;
  constructor(private http:HttpService<any>) {
  }

  postInformation(information:any):Observable<string>{
    return this.http.post(`${this.url}information/save`, information, true);
  }

  getInformation(id:number):Observable<ContenidoItem[]>{
    return this.http.get(`${this.url}information/bySubtopic/${id}`);
  }
  putInformation(information:any):Observable<string>{
    return this.http.put(`${this.url}information/update`, information, true);
  }
  getTopic(id: number): Observable<any> {
    return this.http.get(`${this.url}topic/${id}`)
  }
  deleteInformation(id:any):Observable<string>{
    return this.http.delete(`${this.url}information/delete/${id}`);
  }
}
