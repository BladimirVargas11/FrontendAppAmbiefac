import { Component, Input } from '@angular/core';
import { CursoServiceService } from '../../academy/shared/services/curso.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-learning',
  templateUrl: './navbar-learning.component.html',
  styleUrls: ['./navbar-learning.component.scss']
})
export class NavbarLearningComponent {
  @Input() title:string = ''
  // title?:string = 'Hola';

  constructor(private router:Router){
    // this.title = this.cursoService.getCurso().titleCourse;
  }

  navigateTo(){
    this.router.navigate(['/academy/my-learning'])
  }
}
