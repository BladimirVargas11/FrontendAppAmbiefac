import { Component, OnInit } from '@angular/core';
import { CursoServiceService } from '../../../shared/services/curso.service.service';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { data } from 'jquery';
import { Response } from 'src/app/feature/components/models/response';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit  {
  rutaId: number = 0;
  data: any;
  
  /**
   *
   */
  constructor(private route: ActivatedRoute, private service:LearningService, private sanitizer: DomSanitizer) {
    
    
  }
  
  ngOnInit(): void {
    this.getParameters();
  }


  private getParameters() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('id') ?? '0', 10);
      if (!isNaN(this.rutaId)) {
        console.log('ID de la ruta:', this.rutaId);
        this.service.getSubTopic(this.rutaId).subscribe((data:Response<any>) => {
          this.data = data.data
          this.sortByPosition();
        })
       
      }
    });
  }
  sortByPosition() {
    this.data = this.data.sort((a:any, b:any) => a.position - b.position);
  }
  viewVideo(link: string) {
    return (link) ? this.sanitizer.bypassSecurityTrustResourceUrl(link) : false;
  }
}
