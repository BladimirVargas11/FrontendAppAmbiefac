import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageAdminComponent } from './page-admin/page-admin.component';
import { AgregarCrusoComponent } from './cursos/components/agregar-cruso/agregar-cruso.component';
import { ActualizarCrusoComponent } from './cursos/components/actualizar-cruso/actualizar-cruso.component';
import { ConsultarCursosComponent } from './cursos/components/consultar-cursos/consultar-cursos.component';
import { InformacionTemaComponent } from './contenido-curso/components/informacion-tema/informacion-tema.component';
import { SubtemasCursoComponent } from './contenido-curso/components/subtemas-curso/subtemas-curso.component';
import { AgregarExamenComponent } from './manag-exams/components/agregar-examen/agregar-examen.component';
import { AgregarPreguntasComponent } from './manag-exams/components/agregar-preguntas/agregar-preguntas.component';

const routes: Routes = [
  {path: '',
  component: PageAdminComponent,
  children:[
    {path: '', pathMatch: 'full',redirectTo: 'consultar-curso'},
    {path:'agregar-curso', component: AgregarCrusoComponent},
    {path:'actualizar-curso/:id', component: ActualizarCrusoComponent},
    {path:'consultar-curso', component: ConsultarCursosComponent},
    {path:'temas-cruso/:id/:name', component: SubtemasCursoComponent},
    {path:'informacion-tema/:id', component: InformacionTemaComponent},
    {path:'agregar-preguntas/:id', component: AgregarPreguntasComponent},
    {path:'agregar-examen/:id', component: AgregarExamenComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
