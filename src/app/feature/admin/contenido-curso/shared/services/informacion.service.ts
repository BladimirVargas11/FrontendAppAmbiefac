import { Injectable } from '@angular/core';
import { InformacionTema, informacionTemaData } from '../models/informacion';
import { Observable, Observer, of } from 'rxjs';
import { ContenidoItem } from '../models/contenido';
import { LocalService } from 'src/app/Core/services/local.service';
import { GenericLocalService } from 'src/app/Core/services/generic-local.service';
import { CursoForm, cursos } from '../../../cursos/shared/models/cursosModels';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  entidad = 'contenido';
  constructor(private localService: LocalService<ContenidoItem>,
    private repository: GenericLocalService<CursoForm>) {
    repository.localStorageKey = "cursos"
  }

  add(idCurso: number = 0, idSub: number = 0, data: any) {
    debugger;
    const curso = this.repository.getItemById(idCurso);
    if (curso) {
      const index = curso.Subtemas.findIndex((tema) => tema.id === idSub);
      if (index !== -1) {
        const dataExisting = curso.Subtemas[index].contenido || [];
        curso.Subtemas[index].contenido = [...dataExisting, ...data];
        this.repository.updateItem(curso);
      }
    }
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
