import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalbodyComponent } from './components/modalbody/modalbody.component';



@NgModule({
  declarations: [
    CardBodyComponent,
    PaginationPipe,
    PaginationComponent,
    PaginationPipe,
    ModalbodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbTooltipModule
  ],
  exports:[
    CardBodyComponent,
    PaginationComponent,
    PaginationPipe,
    ReactiveFormsModule,
    NgbTooltipModule,
    HttpClientModule,
    NgbDatepickerModule

  ]
})
export class SharedModule { }
