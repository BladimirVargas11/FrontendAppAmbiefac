import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpService } from '../Core/services/http.service';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    HttpClientModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpService]
})
export class FeatureModule { }
