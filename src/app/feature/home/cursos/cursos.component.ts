import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  curosos = [
   { title:"HOLAMUNDO1", id:'7c9e6679-7425-40de-944b-e07fc1f90ae7'},
    {title:"HOLAMUNDO2",id: '7c9e6679-7425-40de-944b-e07fc1f90ae2'},
    {title:"HOLAMUNDO3",id: '7c9e6679-7425-40de-944b-e07fc1f90ae1'},
    {title:"HOLAMUNDO4",id: '7c9e6679-7425-40de-944b-e07fc1f90ae3'},
    {title:"HOLAMUNDO5",id: '7c9e6679-7425-40de-944b-e07fc1f90ae4'},
    {title:"HOLAMUNDO6",id: '7c9e6679-7425-40de-944b-e07fc1f90ae6'},
    {title:"HOLAMUNDO6",id: '7c9e6679-7425-40de-944b-e07fc1f90ae8'},
  ]
  constructor(private router: Router) { }
  navegarAInformacion(id: string) {
    this.router.navigate(['AMBIEFAC/tema/', id]);
  }
}
