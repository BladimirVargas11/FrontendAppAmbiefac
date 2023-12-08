import { Injectable } from '@angular/core';
import { CursoForm } from '../models/cursosModels';
import { LocalService } from 'src/app/Core/services/local.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  entidad = 'cursos';
  constructor(private localService: LocalService<CursoForm>) {
    
  }
  builderSucessMessage(message?: string): void {
  }

  addData(data: CursoForm): Observable<string> {
    return this.localService.addData( data, this.entidad);
  }

  getData(id: number): Observable<CursoForm[]> {
    return this.localService.getData(id, this.entidad);
  }

  updateDataArray(id: number, updatedItems: CursoForm[]): Observable<string> {
    return this.localService.updateDataArray(id, updatedItems, this.entidad);
  }

  updateDataObject(id: number, updatedItem: CursoForm): Observable<string> {
    return this.localService.updateDataObject(id, updatedItem, this.entidad);
  }

  deleteData(id: number, dataId: number): Observable<string> {
    return this.localService.deleteData(id, dataId, this.entidad);
  }
}
