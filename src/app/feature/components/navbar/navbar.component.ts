import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { HomeService } from '../../home/shared/services/home.service';
import { Client, initialClient } from '../models/client';
import { Response } from '../models/response';
import { data } from 'jquery';
import { faL } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  buscar() {
    throw new Error('Method not implemented.');
  }
  redirectToClient() {
    throw new Error('Method not implemented.');
  }
  terminoBusqueda: string = '';
  mostrarSpinner: boolean = false;
  response: Response<Client> = initialClient;
  showMenu = false;
  isAuthenticate: boolean = false;
  showDropdown: boolean = false;
  showUserDropdown: boolean = false;
  showUserDropdownUser: boolean = false;
  resultadosBusqueda: any[] = []; 
  cursos: any[] = [];


  /**
   *
   */
  constructor(
    private homeService:HomeService,
    private el: ElementRef, private renderer: Renderer2,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.showSpinner()
    this.auth.getClient();
    this.homeService.getTemas().subscribe((data)=> this.cursos = data.data);
    this.auth.userLoggedIn$.subscribe((data: any) => {
      this.response = data
    }
    )
  }
  buscarEnTiempoReal(): void {
    this.resultadosBusqueda = [];
    this.homeService.getSearch(this.terminoBusqueda).subscribe((data:any)=> {
      this.resultadosBusqueda= data.data
      console.log(data.data);
      
    })
  }
  showSpinner() {
    this.mostrarSpinner = !this.mostrarSpinner;
    setTimeout(() => {
      this.mostrarSpinner = !this.mostrarSpinner;
    }, 1000);
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }
  redirecToLogin() {
    this.router.navigate(['auth/login'])
  }
  redirecToRegister() {
    this.router.navigate(['auth/register'])
  }
  redirecToCursos() {
    this.terminoBusqueda = '';
    this.router.navigate(['nuestros-cursos'])
  }
  redirecToClient() {
    this.router.navigate(['academy/my-learning'])
  }
  redirecToIncription(id:string) {
    this.terminoBusqueda = '';
    this.router.navigate([`/inscripcion/${id}`])
  }
  redirecToHome() {
    this.router.navigate(['/'])
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdownuser() {
    this.showUserDropdownUser = !this.showUserDropdownUser;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  logOut() {
    this.auth.logOut();
    this.response = initialClient;
    this.showUserDropdown = false;
    this.showSpinner();
    console.log(this.response.success);

  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(`${elementId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }else if(element === null && elementId === "inicio"){
      this.redirecToHome();
    }
  }
}
