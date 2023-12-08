import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LocalService<T>  {
  builderSucessMessage(message:string = 'OK'){
    Swal.fire({
      title: message,
      icon: "success",
      timer: 1500
    });
  }
  addDataArray(id: number, data: T[], entidad:string): Observable<string> {
    const existingDataString = localStorage.getItem(`${entidad} ${id.toString()}`);
    let lastId = 99;
    let existingData: T[] = [];
    if (existingDataString) {
      existingData = JSON.parse(existingDataString) as T[];
      const lastItem = existingData[existingData.length - 1];
      lastId = lastItem ? (lastItem as any).id : lastId;
    }
    const dataWithIds = data.map((item, index) => ({ ...item, id: lastId + 1 + index }));
    localStorage.setItem(`contenido ${id.toString()}`, JSON.stringify([...(existingData || []), ...dataWithIds]));
    this.builderSucessMessage('Guardado correcto');
    return of('Guardado correcto');
  }
  addData(data: Record<string, any>, entidad: string): Observable<string> {
    const existingDataString = localStorage.getItem(entidad);
    let lastId = 99;
    let existingData: Record<string, any>[] = [];
  
    if (existingDataString) {
      existingData = JSON.parse(existingDataString) as Record<string, any>[];
      const lastItem = existingData[existingData.length - 1];
      lastId = lastItem ? (lastItem as any).id : lastId;
    }
  
    const dataWithId = { ...data, id: lastId + 1 };
    localStorage.setItem(entidad, JSON.stringify([...existingData, dataWithId]));
  
    this.builderSucessMessage('Guardado correcto');
    return of('Guardado correcto');
  }

  getData(id: number = 0, entidad:string): Observable<T[]> {
    let idempy = (id === 0)?'': id.toString();
    const storedDataString = localStorage.getItem(`${entidad}${idempy}`.trim());
    if (storedDataString) {
      const storedData: T[] = JSON.parse(storedDataString) as T[];
      return of(storedData);
    } else {
      return of([]);
    }
  }

  updateDataArray(id: number, updatedItems: T[], entidad:string): Observable<string> {
    const existingDataString =  localStorage.getItem(`${entidad} ${id.toString()}`);
    if (existingDataString) {
      const existingData: T[] = JSON.parse(existingDataString) as T[];
      updatedItems.forEach(updatedItem => {
        const indexToUpdate = existingData.findIndex(item => (item as any).id === (updatedItem as any).id);
        if (indexToUpdate !== -1) {
          existingData[indexToUpdate] = updatedItem;
        } else {
          console.warn('Objeto no encontrado para actualizar:', updatedItem);
        }
      });
      localStorage.setItem(`contenido ${id.toString()}`, JSON.stringify(existingData));
      this.builderSucessMessage('Actualización correcta');
      return of('Actualización correcta');
    } else {
      return of('No hay datos existentes para actualizar');
    }
  }
  updateDataObject(id: number, updatedItem: T, entidad:string): Observable<string> {
    const existingDataString =  localStorage.getItem(`${entidad} ${id.toString()}`);
    if (existingDataString) {
        const existingData: T[] = JSON.parse(existingDataString) as T[];
        const indexToUpdate = existingData.findIndex(item => (item as any).id === (updatedItem as any).id);
        if (indexToUpdate !== -1) {
            existingData[indexToUpdate] = updatedItem;
            localStorage.setItem(`contenido ${id.toString()}`, JSON.stringify(existingData));
            this.builderSucessMessage('Actualización correcta');
            return of('Actualización correcta');
        } else {
            console.warn('Objeto no encontrado para actualizar:', updatedItem);
            return of('Objeto no encontrado para actualizar');
        }
    } else {
        return of('No hay datos existentes para actualizar');
    }
}

  deleteData(id: number, dataId: number, entidad:string): Observable<string> {
    const existingDataString =  localStorage.getItem(`${entidad} ${id.toString()}`);
    if (existingDataString) {
      const existingData: T[] = JSON.parse(existingDataString) as T[];
      const indexToDelete = existingData.findIndex(item => (item as any).id === dataId);
      if (indexToDelete !== -1) {
        existingData.splice(indexToDelete, 1);
        localStorage.setItem(`contenido ${id.toString()}`, JSON.stringify(existingData));
        this.builderSucessMessage('Eliminación correcta');
        return of('Eliminación correcta');
      } else {
        return of('Objeto no encontrado para eliminar');
      }
    } else {
      return of('No hay datos existentes para eliminar');
    }
  }
}
