import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-aprendizaje',
  templateUrl: './mi-aprendizaje.component.html',
  styleUrls: ['./mi-aprendizaje.component.scss']
})
export class MiAprendizajeComponent {

  cursos = [
    {
      id:1,
      img:"assets/galeria-de-imagenes.png",
      nombre:"Curso #1"
    },
    {
      id:2,
      img:"assets/galeria-de-imagenes.png",
      nombre:"Curso #2"
    },
    {
      id:3,
      img:"assets/galeria-de-imagenes.png",
      nombre:"Curso #3"
    },
  ]

}
