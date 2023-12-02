import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { TemasInscripcionComponent } from './temas-inscripcion/temas-inscripcion.component';
import { TemasContenidoComponent } from './temas-contenido/temas-contenido.component';
import { InicioComponent } from './inicio/inicio.component';
import { CursosComponent } from './cursos/cursos.component';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: InicioComponent },
      { path: 'nuestros-cursos', component: CursosComponent },
      { path: 'inscripcion/:id', component: TemasInscripcionComponent },
      { path: 'contenido/:id', component: TemasContenidoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
