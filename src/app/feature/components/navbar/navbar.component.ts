import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;
  showDropdown: boolean = false;
  
  constructor(private router: Router) {
    
  }

  redirecToLogin(){
    this.router.navigate(['auth/login'])
  }
  redirecToRegister(){
    this.router.navigate(['auth/registarte'])
  }
  redirecToCursos(){
    this.router.navigate(['nuestros-cursos'])
  }
  redirecToHome(){
    this.router.navigate([''])
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
