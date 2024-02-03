import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Topìc, emptyTopic } from '../models/topic';
import { ActivatedRoute } from '@angular/router';
import { CourseComponent } from '../../academy/learning/components/course/course.component';
import { SidebarLearningComponent } from '../sidebar-learning/sidebar-learning.component';

@Component({
  selector: 'app-layout-learning',
  templateUrl: './layout-learning.component.html',
  styleUrls: ['./layout-learning.component.scss']
})
export class LayoutLearningComponent implements OnInit, AfterViewInit{

  @Input() topicId: number = 0;
  @Input() data: Topìc = emptyTopic;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(SidebarLearningComponent) sidebar!: SidebarLearningComponent;


  showSidebar: boolean = true;
  lastSelectionIndex: number | undefined;
  constructor() { }
  ngAfterViewInit(): void {
    if (this.sidebar && this.data && (this.data.id > 0) ) {
      this.sidebar.dataTopic = this.data;
    }
  }
  ngOnInit(): void {
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }


  handleSelectionChange(index: any): void {
    this.lastSelectionIndex = index.mainIndex;
    this.selectionChange.emit(index);
 
  }
  
}
