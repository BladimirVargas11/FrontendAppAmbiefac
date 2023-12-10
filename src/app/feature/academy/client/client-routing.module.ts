import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiAprendizajeComponent } from './mi-aprendizaje/mi-aprendizaje.component';

const routes: Routes = [
  {path:'',redirectTo:'my-learning',pathMatch:'full'},
  {path:'my-learning',component:MiAprendizajeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
