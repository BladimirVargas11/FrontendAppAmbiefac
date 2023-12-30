import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../Core/authentication/authentication.service';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('./home/home.module').then(m=> m.HomeModule)},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule)},
  {path: 'academy', loadChildren: ()=> import('./academy/academy.module').then(m=> m.AcademyModule)},
  {path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(m=> m.AdminModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    // AuthenticationService
  ]
})
export class FeatureRoutingModule { }
