import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './Core/authentication/authentication.guard';

const routes: Routes = [
      { path: 'AMBIEFAC', loadChildren: () => import('./Shared/components/components.module').then(m => m.ComponentsModule) },
      { path: 'login', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
      { path: '**', pathMatch: 'full', redirectTo: 'AMBIEFAC' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
