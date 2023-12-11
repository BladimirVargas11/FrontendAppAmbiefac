import { Component } from '@angular/core';
import { tabs } from '../../shared/models/tabsModels';

@Component({
  selector: 'app-mi-aprendizaje',
  templateUrl: './mi-aprendizaje.component.html',
  styleUrls: ['./mi-aprendizaje.component.scss']
})
export class MiAprendizajeComponent {
  tabs = tabs

  selectedTab: string = 'perfil';
  onTabSelected(tab: string): void {
    this.selectedTab = tab;
  }

}
