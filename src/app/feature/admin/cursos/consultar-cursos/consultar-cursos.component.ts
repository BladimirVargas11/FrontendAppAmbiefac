import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Curso, cursos } from '../shared/models/cursosModels';

@Component({
  selector: 'app-consultar-cursos',
  templateUrl: './consultar-cursos.component.html',
  styleUrls: ['./consultar-cursos.component.scss']
})
export class ConsultarCursosComponent {
titulo: string = 'Cursos';
data : Curso[] = []
currentPage = 1;
pageSize = 5;

constructor(private router: Router) {
  this.data = cursos;
}

handleCurrentPageChange(newPage: number) {
  console.log(newPage);
  this.currentPage = newPage;
}
navigateToAdd=()=> this.router.navigate(['admin/agregar-curso']);
}
