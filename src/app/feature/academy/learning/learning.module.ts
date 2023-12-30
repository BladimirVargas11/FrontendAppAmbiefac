import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { CourseComponent } from './components/course/course.component';
import { ComponentsModule } from '../../components/components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { PageLearningComponent } from './components/page-learning/page-learning.component';
import { ExamComponent } from './components/exam/exam.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    CourseComponent,
    CourseContentComponent,
    PageLearningComponent,
    ExamComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class LearningModule { }
