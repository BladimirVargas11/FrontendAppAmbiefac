import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AgregarCrusoComponent } from './cursos/components/agregar-cruso/agregar-cruso.component';
import { ActualizarCrusoComponent } from './cursos/components/actualizar-cruso/actualizar-cruso.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { ConsultarCursosComponent } from './cursos/components/consultar-cursos/consultar-cursos.component';
import { SubtemasCursoComponent } from './contenido-curso/components/subtemas-curso/subtemas-curso.component';
import { InformacionTemaComponent } from './contenido-curso/components/informacion-tema/informacion-tema.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CoreModule } from 'src/app/Core/core.module';
import { AgregarExamenComponent } from './manag-exams/components/agregar-examen/agregar-examen.component';
import { ConsultarExamenComponent } from './manag-exams/components/consultar-examen/consultar-examen.component';
import { FormsModule } from '@angular/forms';
import { AgregarPreguntasComponent } from './manag-exams/components/agregar-preguntas/agregar-preguntas.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AgregarCrusoComponent,
    ActualizarCrusoComponent,
    PageAdminComponent,
    ConsultarCursosComponent,
    SubtemasCursoComponent,
    InformacionTemaComponent,
    AgregarExamenComponent,
    ConsultarExamenComponent,
    AgregarPreguntasComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    SharedModule,
    NgbTooltipModule,
    DragDropModule,
    CoreModule,
    FormsModule
  ]
})
export class AdminModule { }
