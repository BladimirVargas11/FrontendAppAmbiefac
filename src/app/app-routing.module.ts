import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './Core/authentication/authentication.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authenticationGuard] ,
    children: [
      { path: 'Login', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
      { path: '**', pathMatch: 'full', redirectTo: 'Login' },
    ], 
  },
  {path:'**', pathMatch: 'full', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
