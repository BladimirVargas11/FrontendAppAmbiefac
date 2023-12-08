import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { PageHomeComponent } from './page-home/page-home.component';
import { CursosComponent } from './cursos/cursos.component';
import { TemasContenidoComponent } from './temas-contenido/temas-contenido.component';
import { TemasInscripcionComponent } from './temas-inscripcion/temas-inscripcion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    PageHomeComponent,
    CursosComponent,
    TemasContenidoComponent,
    TemasInscripcionComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule

  ]
})
export class HomeModule { }
