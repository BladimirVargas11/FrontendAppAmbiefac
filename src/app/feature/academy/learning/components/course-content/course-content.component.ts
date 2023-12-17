import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent {

  @Input() informations?: any;
  texto?:string;
  image?:string;
  
  



 
}
