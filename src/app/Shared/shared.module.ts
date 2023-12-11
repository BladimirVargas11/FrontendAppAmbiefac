import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalbodyComponent } from './components/modalbody/modalbody.component';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CardBodyComponent,
    PaginationPipe,
    PaginationComponent,
    PaginationPipe,
    ModalbodyComponent,
    SharedTableComponent
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
    SharedTableComponent,
    
    PaginationPipe,
    ReactiveFormsModule,
    NgbTooltipModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgxSpinnerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
