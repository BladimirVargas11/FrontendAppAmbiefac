import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { data } from 'jquery';
import { Topìc, emptyTopic } from 'src/app/feature/components/models/topic';

@Component({
  selector: 'app-page-learning',
  templateUrl: './page-learning.component.html',
  styleUrls: ['./page-learning.component.scss']
})
export class PageLearningComponent implements OnInit {
  rutaId: number = 0;
  data: Topìc = emptyTopic;
  
  /**
   *
   */
  constructor(
    private route: ActivatedRoute, 
    private service:LearningService
    ) {
  
  }
  
  ngOnInit(): void {
    this.getParameters();
  }


  private getParameters() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('parentId') ?? '0', 10);
      if (!isNaN(this.rutaId)) {
        console.log('ID de la ruta:', this.rutaId);
        this.service.getTopic(this.rutaId).subscribe((data)=> this.data = data.data)
      }
    });
  }
}
