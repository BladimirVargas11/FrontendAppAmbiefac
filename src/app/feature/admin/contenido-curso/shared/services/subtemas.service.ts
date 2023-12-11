import { Injectable } from '@angular/core';
import { LocalService } from 'src/app/Core/services/local.service';
import { Subtema } from '../../../cursos/shared/models/subTemasModels';
import { SubTema, SubTemaModel } from '../models/subtemas';
import { Observable } from 'rxjs/internal/Observable';
import { GenericLocalService } from 'src/app/Core/services/generic-local.service';
import { CursoForm, cursos } from '../../../cursos/shared/models/cursosModels';

@Injectable({
  providedIn: 'root'
})
export class SubtemasService {
  entidad: string = 'cursos';

  constructor(private repository: GenericLocalService<CursoForm>) {
    repository.localStorageKey = "cursos"
  }

  add(idCurso: number, subtema:any){
      const curso = this.repository.getItemById(idCurso);
      curso?.Subtemas.push(subtema);
      this.repository.updateItem(curso !)
  }
  
  get():CursoForm[] {
    return this.repository.getAllItems() || [];
  }
  getById(id:number):any {
   let curso = this.repository.getItemById(id)  ;
    return curso
  }

  
  
}
