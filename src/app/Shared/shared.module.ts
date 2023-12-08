import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    CardBodyComponent,
    PaginationPipe,
    PaginationComponent,
    PaginationPipe
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
    HttpClientModule
  ]
})
export class SharedModule { }
