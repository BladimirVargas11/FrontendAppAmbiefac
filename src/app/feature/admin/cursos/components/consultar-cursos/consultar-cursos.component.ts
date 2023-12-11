import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursoForm, cursos } from '../../shared/models/cursosModels';
import { CursoService } from '../../shared/services/curso.service';
import { error } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-cursos',
  templateUrl: './consultar-cursos.component.html',
  styleUrls: ['./consultar-cursos.component.scss']
})
export class ConsultarCursosComponent {
titulo: string = 'Temas';
data : CursoForm[] = []
currentPage = 1;
pageSize = 5;

constructor(
  private router: Router, 
  private crusoService:CursoService, 
  private spinner: NgxSpinnerService) {
  this.getCursos()
}

getCursos(){
  this.spinner.show();
  this.crusoService.getData().subscribe(
    (data)=>{
    this.data = data
    this.hiden();
  }, 
  (error)=>{
    this.hiden();
    console.error('Han ocurrido errores', error)
  }
  )
}
hiden(){
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
}
eliminarCurso(curso:any){}
editarCurso=(id:number)=> this.router.navigate([`admin/actualizar-curso/${id}`]);
verContenidoCurso=(id:number)=> {
  let data = this.data.find(x=> x.id === id);
  this.router.navigate([`admin/temas-cruso/${id}/${data?.nombreCurso}`])
}
handleCurrentPageChange(newPage: number) {
  console.log(newPage);
  this.currentPage = newPage;
}
navigateToAdd=()=> this.router.navigate(['admin/agregar-curso']);
}
