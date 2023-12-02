import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors/errors.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutClienteComponent } from './layout-cliente/layout-cliente.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    ErrorsComponent,
    FooterComponent,
    LayoutComponent,
    LayoutAdminComponent,
    LayoutClienteComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LayoutComponent,
    LayoutAdminComponent,
    LayoutClienteComponent,
    
  ]
})
export class ComponentsModule { }
