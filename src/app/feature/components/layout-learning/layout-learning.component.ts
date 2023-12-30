import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Topìc, emptyTopic } from '../models/topic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-learning',
  templateUrl: './layout-learning.component.html',
  styleUrls: ['./layout-learning.component.scss']
})
export class LayoutLearningComponent implements OnInit {

  @Input() topicId: number = 0;
  @Input() data: Topìc = emptyTopic;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  showSidebar: boolean = true;
  lastSelectionIndex: number | undefined;
  constructor() { }
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
