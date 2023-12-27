import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { HomeService } from '../../home/shared/services/home.service';
import { Client, initialClient} from '../models/client';
import { Response } from '../models/response';
import { data } from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  response: Response<Client> = initialClient;
  showMenu = false;
  showDropdown: boolean = false;
  /**
   *
   */
  constructor(
    private auth: AuthenticationService,
    private router: Router)
     { }

  ngOnInit(): void {
   this.auth.getClient();
    this.auth.userLoggedIn$.subscribe((data: any) => {
      this.response = data
    }
    )
  }

  redirecToLogin() {
    this.router.navigate(['auth/login'])
  }
  redirecToRegister() {
    this.router.navigate(['auth/registarte'])
  }
  redirecToCursos() {
    this.router.navigate(['nuestros-cursos'])
  }
  redirecToClient() {
    this.router.navigate(['academy/my-learning'])
  }
  redirecToHome() {
    this.router.navigate([''])
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
