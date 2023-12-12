import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { CourseComponent } from './components/course/course.component';
import { ComponentsModule } from '../../components/components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    ComponentsModule,
  ]
})
export class LearningModule { }
