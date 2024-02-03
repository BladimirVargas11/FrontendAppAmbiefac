import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
interface SidebarLink {
  label: string;
  route: string;
  selected: boolean;
  title: string;
  icon: string;
}
@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.scss']
})
export class SidenavAdminComponent {
  @Output() enviarTitulo = new EventEmitter<string>()
  selectedLink: string | null = null;
  isSidebarOpen = false;
  /**
   *
   */
  constructor(private router:Router, private auth: AuthenticationService) {
    
    
  }

  sidebarLinks: SidebarLink[] = [
    { label: 'Gestionar Temas', route: 'admin/consultar-curso', selected: true, title: 'Cursos', icon: 'fa-book' },
    { label: 'Gestionar Examen', route: 'admin/agregar-examen', selected: false, title: '', icon: 'fa-file-alt' },
    // ...
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  selectLink(selectedLink: SidebarLink): void {
    this.sidebarLinks.forEach(link => link.selected = false);
    this.enviarTitulo.emit(selectedLink.title);
    selectedLink.selected = true;
  }
  navigateTo(link:string){
    this.router.navigate([link]);
  }
  logOut(){
    this.auth.logOut();
    this.navigateTo("auth/")
  }
}
