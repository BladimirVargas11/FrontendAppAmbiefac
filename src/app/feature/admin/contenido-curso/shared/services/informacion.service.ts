import { Injectable } from '@angular/core';
import { InformacionTema, informacionTemaData } from '../models/informacion';
import { Observable, Observer, of } from 'rxjs';
import { ContenidoItem } from '../models/contenido';
import { LocalService } from 'src/app/Core/services/local.service';
import { GenericLocalService } from 'src/app/Core/services/generic-local.service';
import { CursoForm, cursos } from '../../../cursos/shared/models/cursosModels';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  entidad = 'contenido';
  url: string = environment.apiUrl;
  constructor(
    private localService: LocalService<ContenidoItem>,
    private repository: GenericLocalService<CursoForm>,
    private http:HttpService<any>) {
    repository.localStorageKey = "cursos"
  }

  postInformation(information:any):Observable<string>{
    return this.http.post(`${this.url}information/save`, information, true);
  }

  getInformation(id:number):Observable<ContenidoItem[]>{
    return this.http.get(`${this.url}information/bySubtopic/${id}`);
  }
  putInformation(information:any):Observable<string>{
    debugger
    return this.http.put(`${this.url}information/update`, information, true);
  }

  update(idCurso: number, idSub: number, data: any) {
    debugger;
    const curso = this.repository.getItemById(idCurso);
    if (curso) {
      const index = curso.Subtemas.findIndex((tema) => tema.id === idSub);
      if (index !== -1) {
        data.forEach((updatedItem: any) => {
          const contenidoArray = curso.Subtemas[index].contenido;
          if (contenidoArray) {
            const indexToUpdate = contenidoArray.findIndex(
              (item: any) => item?.id === updatedItem?.id
            );

            if (indexToUpdate !== -1) {
              contenidoArray[indexToUpdate] = updatedItem;
            } else {
              console.warn('Objeto no encontrado para actualizar:', updatedItem);
            }
          }
        });

        this.repository.updateItem(curso);
      }
    }
  }

  get(idCurso: number, idSub: number): Observable<ContenidoItem[]> {
    const curso = this.repository.getItemById(idCurso);
    if (curso) {
      const subtema = curso.Subtemas.find(x => x.id === idSub);
      if (subtema) {
        return of(subtema.contenido.flat());
      }
    }
    return of([]);
  }

  addData(id: number, data: ContenidoItem[]): Observable<string> {
    return this.localService.addDataArray(id, data, this.entidad);
  }

  getData(id: number): Observable<ContenidoItem[]> {
    return this.localService.getData(id, this.entidad);
  }

  updateDataArray(id: number, updatedItems: ContenidoItem[]): Observable<string> {
    return this.localService.updateDataArray(id, updatedItems, this.entidad);
  }

  updateDataObject(id: number, updatedItem: ContenidoItem): Observable<string> {
    return this.localService.updateDataObject(id, updatedItem, this.entidad);
  }

  deleteData(id: number, dataId: number): Observable<string> {
    return this.localService.deleteData(id, dataId, this.entidad);
  }

}
