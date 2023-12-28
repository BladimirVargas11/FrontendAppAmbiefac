import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { PageLearningComponent } from './components/page-learning/page-learning.component';

const routes: Routes = [
  {
    path: ':parentId',
    component:PageLearningComponent,
    children:[
      {path:'subtopic/:id', component:CourseComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
