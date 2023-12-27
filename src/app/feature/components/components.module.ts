import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors/errors.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutClienteComponent } from './layout-cliente/layout-cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarClientComponent } from './navbar-client/navbar-client.component';
import { SidenavAdminComponent } from './sidenav-admin/sidenav-admin.component';
import { LayoutLearningComponent } from './layout-learning/layout-learning.component';
import { SidenavLearningComponent } from './sidenav-learning/sidenav-learning.component';
import { NavbarLearningComponent } from './navbar-learning/navbar-learning.component';



@NgModule({
  declarations: [
    ErrorsComponent,
    FooterComponent,
    LayoutComponent,
    LayoutAdminComponent,
    LayoutClienteComponent,
    NavbarComponent,
    NavbarClientComponent,
    SidenavAdminComponent,
    LayoutLearningComponent,
    SidenavLearningComponent,
    NavbarLearningComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    ErrorsComponent,
    LayoutComponent,
    LayoutAdminComponent,
    LayoutClienteComponent,
    SidenavAdminComponent,
    NavbarClientComponent,
    LayoutLearningComponent,
    SidenavLearningComponent
  ]
})
export class ComponentsModule { }
