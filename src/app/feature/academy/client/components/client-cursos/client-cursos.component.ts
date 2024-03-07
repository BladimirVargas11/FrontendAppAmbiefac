import { Component, OnInit } from '@angular/core';
import { cursos } from '../../../data/cursos';
import { CursoServiceService } from '../../../shared/services/curso.service.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { data } from 'jquery';

@Component({
  selector: 'app-client-cursos',
  templateUrl: './client-cursos.component.html',
  styleUrls: ['./client-cursos.component.scss']
})
export class ClientCursosComponent implements OnInit {

  cursos: any[] = [];
  cursoSelecionado: any;

  constructor(private service: ProfileService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getLoggedInUser().subscribe(user => {
      console.log(user);
    });
    this.getCursos();
  }
  
  getCursos() {
    let id = this.auth.getUserId();
    this.service.getClientCourse(id || 0).subscribe((data: any) => this.cursos = data.data);
  }

  verifyImage = (link: string): boolean => (link.startsWith('http://') || link.startsWith('https://'))


  seleccionarCurso(curso: any) {
    this.router.navigate([`/academy/learning/${curso.topicId}`])
    // this.router.navigate([`academy/learning/${curso.topicId}/subtopic/0`, { parentId: curso.topicId, queryParams: 0 }])
  }
}
