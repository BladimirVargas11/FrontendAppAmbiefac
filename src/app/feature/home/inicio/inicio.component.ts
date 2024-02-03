import { Component, HostListener } from '@angular/core';
import { EnvironmentCourse, environmentCourses } from '../shared/models/EnvironmentCourse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  courses: EnvironmentCourse[] = environmentCourses;

  showFloatingButton = false;

  /**
   *
   */
  constructor( private router: Router) {
    
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
  
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  redirecToCursos() {
    this.router.navigate(['/nuestros-cursos'])
  }
  redirecToRegister() {
    this.router.navigate(['/auth/register'])
  }

}
