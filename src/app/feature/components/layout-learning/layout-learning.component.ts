import { Component, Input, OnInit } from '@angular/core';
import { Topìc, emptyTopic } from '../models/topic';

@Component({
  selector: 'app-layout-learning',
  templateUrl: './layout-learning.component.html',
  styleUrls: ['./layout-learning.component.scss']
})
export class LayoutLearningComponent implements OnInit {

  @Input() topicId:number= 0;
  @Input() data:Topìc = emptyTopic;
  showSidebar: boolean = true;
  lastSelectionIndex: number | undefined;
  ngOnInit(): void {
  // setTimeout(() => {
  //   console.log(this.data);
  // }, 2000);    
  }
  toggleSidebar(): void {
    // debugger
    this.showSidebar = !this.showSidebar;
    this.lastSelectionIndex
  }
  handleSelectionChange(index: number): void {
    this.lastSelectionIndex = index;
  }
}
