import { Component, EventEmitter, Output } from '@angular/core';
interface SidebarLink {
  label: string;
  route: string;
  selected: boolean;
  title: string;
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

  sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', route: '#', selected: false , title: 'Cursos'},
    { label: 'Categories', route: '#', selected: false, title: '' },
    { label: 'Reports', route: '#', selected: false , title: ''},
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  selectLink(selectedLink: SidebarLink): void {
    this.sidebarLinks.forEach(link => link.selected = false);
    this.enviarTitulo.emit(selectedLink.title);
    selectedLink.selected = true;
  }
}
