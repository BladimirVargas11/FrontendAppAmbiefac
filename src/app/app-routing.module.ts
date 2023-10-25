import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'Login', loadChildren: ()=> import('./Modules/auth/auth.module').then(m=> m.AuthModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'Login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
