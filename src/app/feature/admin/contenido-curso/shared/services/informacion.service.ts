import { Injectable } from '@angular/core';
import { InformacionTema, informacionTemaData } from '../models/informacion';
import { Observable, of } from 'rxjs';
import { ContenidoItem } from '../models/contenido';
import Swal from 'sweetalert2'
import { LocalService } from 'src/app/Core/services/local.service';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  entidad = 'contenido';
  constructor(private localService: LocalService<ContenidoItem>) {
    
  }
  builderSucessMessage(message?: string): void {
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
