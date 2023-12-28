import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-learning',
  templateUrl: './sidebar-learning.component.html',
  styleUrls: ['./sidebar-learning.component.scss']
})
export class SidebarLearningComponent implements OnInit {
  ngOnInit(): void {
    if (this.lastSelectionIndex !== undefined && this.lastSelectionIndex < this.menuItems.length) {
      this.menuItems[this.lastSelectionIndex].showSubMenu = true;
    }
  }
  @Input() lastSelectionIndex: number | undefined;
  @Output() selectionChanged = new EventEmitter<number>();

  title?:string = 'Hola';
  showSidebar = true;
  menuItems = [
    {
      label: 'Menu 1',
      subMenu: [
        { label: 'Submenu 1.1', route: '/submenu1' },
        { label: 'Submenu 1.2', route: '/submenu2' }
      ],
      showSubMenu: false
    },
    {
      label: 'Menu 2',
      subMenu: [
        { label: 'Submenu 2.1', route: '/submenu3' },
        { label: 'Submenu 2.2', route: '/submenu4' }
      ],
      showSubMenu: false
    }
    // Agrega más elementos según tu necesidad
  ];
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSubMenu(menuItem: any, index: number): void {
    menuItem.showSubMenu = !menuItem.showSubMenu;
    this.menuItems.forEach((item, i) => {
      if (item !== menuItem) {
        item.showSubMenu = false;
      }
    });

    // Emitir el índice del elemento seleccionado al padre
    this.selectionChanged.emit(index);
  }

  changeIndex(index: number): void {
    this.selectionChanged.emit(index);
  }

  navigateToContent(subMenuItem: any): void {
    console.log(`Navigating to ${subMenuItem.route}`);
  }
}
