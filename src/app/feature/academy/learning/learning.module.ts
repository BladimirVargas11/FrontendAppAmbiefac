import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { CourseComponent } from './components/course/course.component';
import { ComponentsModule } from '../../components/components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CourseContentComponent } from './components/course-content/course-content.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseContentComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    ComponentsModule,
  ]
})
export class LearningModule { }
