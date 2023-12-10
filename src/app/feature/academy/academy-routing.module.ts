import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: ()=> import('./client/client.module').then(m=>m.ClientModule)},
    {path: 'learning', loadChildren: ()=> import('./learning/learning.module').then(m=>m.LearningModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
