import { Component } from '@angular/core';
import { CursoServiceService } from '../../../shared/services/curso.service.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  curso:any;
  subtopics?:any[];
  informations:any;

  constructor(private cursoService:CursoServiceService){
    this.curso = cursoService.getCurso();
  }

  ngOnInit(): void {
    console.log(this.informations);
  }

}
