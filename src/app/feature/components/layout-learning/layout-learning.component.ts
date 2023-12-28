import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-learning',
  templateUrl: './layout-learning.component.html',
  styleUrls: ['./layout-learning.component.scss']
})
export class LayoutLearningComponent {
  @Input() data:any = {};
  showSidebar: boolean = true;
  lastSelectionIndex: number | undefined;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  handleSelectionChange(index: number): void {
    this.lastSelectionIndex = index;
  }
}
