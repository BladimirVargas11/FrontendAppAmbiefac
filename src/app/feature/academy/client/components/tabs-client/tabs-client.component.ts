import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsModel } from '../../shared/models/tabsModels';

@Component({
  selector: 'app-tabs-client',
  templateUrl: './tabs-client.component.html',
  styleUrls: ['./tabs-client.component.scss']
})
export class TabsClientComponent {
  @Input() tabs: TabsModel[] = [];
  @Output() tabSelected = new EventEmitter<string>();
  selectedTab: string = 'perfil';

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.tabSelected.emit(tab); 
  }
}
