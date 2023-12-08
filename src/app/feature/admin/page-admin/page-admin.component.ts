import { Component } from '@angular/core';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent {
titulo: string = 'Cursos';

recibirTitulo(titulo: string) {
  this.titulo = titulo;
}
}
