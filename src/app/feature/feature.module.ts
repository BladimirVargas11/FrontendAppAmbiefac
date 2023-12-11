import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSpinnerModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureModule { }
