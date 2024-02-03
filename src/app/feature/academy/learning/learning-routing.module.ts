import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { PageLearningComponent } from './components/page-learning/page-learning.component';
import { ExamComponent } from './components/exam/exam.component';

const routes: Routes = [
  {
    path: ':parentId',
    component:PageLearningComponent,
    children:[
      {path:'', component:CourseComponent},
      {path:'exam/:id', component:ExamComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
