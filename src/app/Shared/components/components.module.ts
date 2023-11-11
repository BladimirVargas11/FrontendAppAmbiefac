import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { BodyComponent } from './body/body.component';
import { error } from 'jquery';
import { ErrorsComponent } from './errors/errors.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    BodyComponent,
    ErrorsComponent,
    FooterComponent,
    ModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
