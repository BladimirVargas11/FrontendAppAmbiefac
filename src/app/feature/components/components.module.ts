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
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    LayoutComponent,
    LayoutAdminComponent,
    LayoutClienteComponent,
    SidenavAdminComponent,
    NavbarClientComponent
  ]
})
export class ComponentsModule { }
