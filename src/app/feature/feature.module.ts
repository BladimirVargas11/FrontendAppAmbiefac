import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule 
  ]
})
export class FeatureModule { }
