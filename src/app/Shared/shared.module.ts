import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './components/errors/errors.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    ReactiveFormsModule,
    NgbTooltipModule,
    HttpClientModule
  ]
})
export class SharedModule { }
