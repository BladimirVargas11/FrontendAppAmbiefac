import { Component, Input, OnInit } from '@angular/core';
import { CursoServiceService } from '../../../shared/services/curso.service.service';
import { ActivatedRoute, Scroll } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { data } from 'jquery';
import { Response } from 'src/app/feature/components/models/response';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  rutaId: number = 0;
  @Input() index = {mainIndex: 0, subIndex:0};
  @Input() data: any ={};
  parentId: number = 0;
  topic: any;
  loading: boolean = true;

  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private service: LearningService,
    private sanitizer: DomSanitizer,) {


  }

  ngOnInit(): void {
    this.getParameters();
  }
  hiden() {
    setTimeout(() => {
      this.loading = false;
      console.log(this.data);
    }, 1000);
  }
  private getParameters() {

    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id') ?? '0', 10);
      this.parentId = parseInt(params.get('parentId') ?? '0', 10);
      const parameter = params.get('queryParams') ?? '0';

      if (!isNaN(this.rutaId)) {
        // this.getSubtopic();
        // this.getTopic();
      }
      this.hiden()
      console.log("desde curso:",this.index);
      
    });
  }
  private getSubtopic() {
    // this.loading = true;
    this.service.getSubTopic(this.rutaId).subscribe((data: Response<any>) => {
      this.data = data.data;
      this.sortByPosition();
      this.hiden()
    });
  }

  private getTopic() {
    // this.loading = true;
    this.service.getTopic(this.parentId).subscribe((data: Response<any>) => {
      this.topic = data.data;
      this.hiden()
    });
  }

  sortByPosition() {
    this.data = this.data.sort((a: any, b: any) => a.position - b.position);
  }
  viewVideo(link: string) {
    return (link) ? this.sanitizer.bypassSecurityTrustResourceUrl(link) : false;
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
