import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { BodyComponent } from './body/body.component';
import { error } from 'jquery';
import { ErrorsComponent } from './errors/errors.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CursosComponent } from 'src/app/Modules/pages/cursos/cursos.component';
import { HomeComponent } from 'src/app/Modules/pages/home/home.component';
import { TemasContenidoComponent } from 'src/app/Modules/pages/temas-contenido/temas-contenido.component';
import { TemasInscripcionComponent } from 'src/app/Modules/pages/temas-inscripcion/temas-inscripcion.component';
import { JuegoExampleComponent } from 'src/app/Modules/pages/juego-example/juego-example.component';
import { FormsModule } from '@angular/forms';
import { JuegoExample1Component } from 'src/app/Modules/pages/juego-example1/juego-example1.component';


@NgModule({
  declarations: [
    BodyComponent,
    ErrorsComponent,
    FooterComponent,
    ModalComponent,
    NavbarComponent,
    HomeComponent,
    CursosComponent,
    TemasInscripcionComponent,
    TemasContenidoComponent,
    JuegoExampleComponent,
    JuegoExample1Component
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule
  ]
})
export class ComponentsModule { }
