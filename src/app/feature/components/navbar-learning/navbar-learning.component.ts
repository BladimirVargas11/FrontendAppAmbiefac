import { Component, Input } from '@angular/core';
import { CursoServiceService } from '../../academy/shared/services/curso.service.service';

@Component({
  selector: 'app-navbar-learning',
  templateUrl: './navbar-learning.component.html',
  styleUrls: ['./navbar-learning.component.scss']
})
export class NavbarLearningComponent {
  @Input() title:string = ''
  // title?:string = 'Hola';

  constructor(private cursoService:CursoServiceService){
    // this.title = this.cursoService.getCurso().titleCourse;
  }

}
