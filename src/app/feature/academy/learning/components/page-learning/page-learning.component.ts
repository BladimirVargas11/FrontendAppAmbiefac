import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LearningService } from '../../shared/services/learning.service';
import { Topìc, emptyTopic } from 'src/app/feature/components/models/topic';
import { CourseComponent } from '../course/course.component';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';

@Component({
  selector: 'app-page-learning',
  templateUrl: './page-learning.component.html',
  styleUrls: ['./page-learning.component.scss']
})
export class PageLearningComponent implements OnInit {
  rutaId: number = 0;
  data: Topìc = emptyTopic;
  selectedIndex: any = { mainIndex: -1, subIndex: -1 };
  loading: boolean = false;
  registration: any;
  @ViewChild(CourseComponent) curso!: CourseComponent;

  /**
   *
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LearningService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log("examen", this.data.exam_id);
    }, 1000);
    this.showAndHiden();
    this.getParameters();
  }

  handleSelection(index: any): void {
    console.log(`Índice seleccionado:`, index);
    if (index.mainIndex !== this.selectedIndex.mainIndex) {
      this.showAndHiden();
    }
    this.selectedIndex = index;
    if (index.subIndex > -1 && this.curso) {
      this.curso.scrollToSection(index.subIndex);
    }
    // Tu lógica adicional aquí
  }

  private showAndHiden() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  private getParameters() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = parseInt(params.get('parentId') ?? '0', 10);
      if (!isNaN(this.rutaId)) {
        console.log('ID de la ruta:', this.rutaId);
        this.service.getValidInscription(this.auth.getUserId() || 0, this.rutaId).subscribe(
          (response) => {
            this.registration = response.data;
            console.log(response.data);
            (response.data)
              ? this.service.getTopic(this.rutaId).subscribe((topic) => this.data = topic.data)
              : this.router.navigate(['/']);
          },
          (error) => { this.router.navigate(['/']) }
        )
      }
    });
  }
}
