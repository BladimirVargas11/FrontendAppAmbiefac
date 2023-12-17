import { Component } from '@angular/core';
import { CursoServiceService } from '../../academy/shared/services/curso.service.service';

@Component({
  selector: 'app-navbar-learning',
  templateUrl: './navbar-learning.component.html',
  styleUrls: ['./navbar-learning.component.scss']
})
export class NavbarLearningComponent {

  title?:string;

  constructor(private cursoService:CursoServiceService){
    this.title = this.cursoService.getCurso().titleCourse;
  }

}
