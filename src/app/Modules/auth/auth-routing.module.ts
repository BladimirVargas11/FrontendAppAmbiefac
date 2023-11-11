import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'Iniciar sesion', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
      { path: '**',  pathMatch: 'full', redirectTo: 'Iniciar sesion' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
