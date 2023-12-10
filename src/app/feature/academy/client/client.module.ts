import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';

import { ClientCursosComponent } from './client-cursos/client-cursos.component';
import { MiAprendizajeComponent } from './mi-aprendizaje/mi-aprendizaje.component';
import { MisLogrosComponent } from './mis-logros/mis-logros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClientCursosComponent,
    PerfilComponent,
    MiAprendizajeComponent,
    MisLogrosComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ComponentsModule,
    RouterModule
  ]
})
export class ClientModule { }
