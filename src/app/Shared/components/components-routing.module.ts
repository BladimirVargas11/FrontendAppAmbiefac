import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from 'src/app/Modules/pages/home/home.component';
import { CursosComponent } from 'src/app/Modules/pages/cursos/cursos.component';
import { TemasInscripcionComponent } from 'src/app/Modules/pages/temas-inscripcion/temas-inscripcion.component';
import { TemasContenidoComponent } from 'src/app/Modules/pages/temas-contenido/temas-contenido.component';
import { JuegoExampleComponent } from 'src/app/Modules/pages/juego-example/juego-example.component';
import { JuegoExample1Component } from 'src/app/Modules/pages/juego-example1/juego-example1.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'cursos', component:CursosComponent  },
      { path: 'tema/:id', component:TemasInscripcionComponent },
      { path: 'tema contenido/:id', component:TemasContenidoComponent},
      { path: 'juego', component:JuegoExampleComponent},
      { path: 'juego1', component:JuegoExample1Component},
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
