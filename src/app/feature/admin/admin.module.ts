import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AgregarCrusoComponent } from './cursos/agregar-cruso/agregar-cruso.component';
import { ActualizarCrusoComponent } from './cursos/actualizar-cruso/actualizar-cruso.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { ConsultarCursosComponent } from './cursos/consultar-cursos/consultar-cursos.component';
import { SubtemasCursoComponent } from './contenido-curso/subtemas-curso/subtemas-curso.component';
import { InformacionTemaComponent } from './contenido-curso/informacion-tema/informacion-tema.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AgregarCrusoComponent,
    ActualizarCrusoComponent,
    PageAdminComponent,
    ConsultarCursosComponent,
    SubtemasCursoComponent,
    InformacionTemaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    SharedModule,
    NgbTooltipModule,
    DragDropModule
  ]
})
export class AdminModule { }
