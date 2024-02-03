import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subtopic, Topìc, emptyTopic } from '../models/topic';
import { data } from 'jquery';

@Component({
  selector: 'app-sidebar-learning',
  templateUrl: './sidebar-learning.component.html',
  styleUrls: ['./sidebar-learning.component.scss']
})
export class SidebarLearningComponent implements OnInit {
  @Input() lastSelectionIndex: number | undefined;
  @Input() dataTopic: Topìc = emptyTopic;
  @Output() selectionChanged = new EventEmitter<{ mainIndex: number, subIndex: number }>();
  title?: string = 'Hola';
  showSidebar = true;
  menuItems: Subtopic[] = [];

  constructor(private router: Router) {
    this.selectionChanged.emit({ mainIndex: -1, subIndex: -1 });
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 100);
  }
  private getData() {
    this.dataTopic.subtopic = this.dataTopic.subtopic.map(subtopic => ({ ...subtopic, showSubMenu: false }));
    this.menuItems = this.dataTopic.subtopic;
    if (this.lastSelectionIndex !== undefined && this.lastSelectionIndex < this.menuItems.length) {
      this.menuItems[this.lastSelectionIndex].showSubMenu = true;
      console.log(this.menuItems);
    }
  }

  public groupDataBySubtopic(data: any): Subtopic[] {
    const groupedData: Subtopic[] = [];
    data.forEach((item: any) => {
      const existingSubtopic = groupedData.find(
        (subtopic) => subtopic.subtopic_id === item.subtopic_id
      );

      if (existingSubtopic) {
        existingSubtopic.information.push({
          information_id: item.information[0].information_id,
          content: item.information[0].content,
          title: item.information[0].title,
          type: item.information[0].type,
          position: item.information[0].position,
        });
      } else {
        groupedData.push({
          subtopic_id: item.subtopic_id,
          subtopic_name: item.subtopic_name,
          information: [
            {
              information_id: item.information[0].information_id,
              content: item.information[0].content,
              title: item.information[0].title,
              type: item.information[0].type,
              position: item.information[0].position,
            },
          ],
          showSubMenu: false
        });
      }
    });

    return groupedData;
  }

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
    this.selectionChanged.emit({ mainIndex:index, subIndex: -1 });
  }

  changeIndex(mainIndex: number, subIndex: number): void {
    this.selectionChanged.emit({ mainIndex, subIndex });
  }

  navigateToContent(subMenuItem: any, subIndex: number , mainIndex: number ): void {
    this.selectionChanged.emit({ mainIndex, subIndex });
    // this.router.navigate([`academy/learning/${this.dataTopic.id}/subtopic/${subMenuItem.subtopic_id}`,  { parentId: this.dataTopic.id, queryParams: index.toString() }])
  }

  navigateToExam(): void {
    // this.router.navigate([`academy/learning/${this.dataTopic.id}/exam/${this.dataTopic.exam_id}`])
    this.selectionChanged.emit({ mainIndex:-2, subIndex:-2 });

  }
}
