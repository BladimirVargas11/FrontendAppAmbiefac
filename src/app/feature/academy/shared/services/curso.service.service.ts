import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoServiceService {

  constructor() { }

  cursoSelecionado: any;
  information: any;

  setCurso(curso:any){
    this.cursoSelecionado = curso;
    console.log(this.cursoSelecionado);
  }

  setInformation(information:any){
    this.information = information;
  }

  getInformation(){
   return this.information;
  }
  getCurso(){
    return this.cursoSelecionado;
  }
}
