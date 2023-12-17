import { Component, ContentChild } from '@angular/core';
import { cursos } from '../../academy/data/cursos';
import { CursoServiceService } from '../../academy/shared/services/curso.service.service';
import { CourseContentComponent } from '../../academy/learning/components/course-content/course-content.component';

@Component({
  selector: 'app-sidenav-learning',
  templateUrl: './sidenav-learning.component.html',
  styleUrls: ['./sidenav-learning.component.scss']
})
export class SidenavLearningComponent {

  data = [
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
    {
      name:"tema 1",
      subtemas:[
        {
          title:"title 1"
        }
      ]
    },
  ]
  subtopics?:any[];
  curso?:any;
  information?:any;
  @ContentChild(CourseContentComponent) course!:CourseContentComponent;
  isMenuExpanded = true;

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  constructor(private serviceCurso: CursoServiceService){
    this.curso = serviceCurso.getCurso();
  }

  ngOnInit(): void {
    console.log(this.curso.topics);
    this.curso.topics.map((data:any) =>{
      console.log(data.subtopics);
      this.subtopics = data.subtopics;
    })

  }

  ngAfterContentInit(): void {
    if(this.course){
      this.course.informations = this.information;
    }
    
  }

  seleccionarInformacion(information:any){
  if(this.course){
    this.course.informations = information;
  }
  }

}
