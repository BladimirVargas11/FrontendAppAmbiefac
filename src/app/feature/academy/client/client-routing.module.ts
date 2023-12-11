import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiAprendizajeComponent } from './components/mi-aprendizaje/mi-aprendizaje.component';
import { PageClientComponent } from './components/page-client/page-client.component';

const routes: Routes = [
  {
    path: '',
    component: PageClientComponent,
    children: [
      { path: '', redirectTo: 'my-learning', pathMatch: 'full' },
      { path: 'my-learning', component: MiAprendizajeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
