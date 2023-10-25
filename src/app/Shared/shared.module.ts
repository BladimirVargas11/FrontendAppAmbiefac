import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './components/errors/errors.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    
  
    ErrorsComponent,
            NavbarComponent,
            FooterComponent,
            ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
