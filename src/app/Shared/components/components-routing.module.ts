import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from 'src/app/Modules/pages/home/home.component';
import { CursosComponent } from 'src/app/Modules/pages/cursos/cursos.component';
import { TemasInscripcionComponent } from 'src/app/Modules/pages/temas-inscripcion/temas-inscripcion.component';
import { TemasContenidoComponent } from 'src/app/Modules/pages/temas-contenido/temas-contenido.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      { path: 'Inicio', component: HomeComponent },
      { path: 'Cursos', component:CursosComponent  },
      { path: 'Tema/:id', component:TemasInscripcionComponent },
      { path: 'Tema contenido/:id', component:TemasContenidoComponent},
      { path: '**', redirectTo: 'Inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
