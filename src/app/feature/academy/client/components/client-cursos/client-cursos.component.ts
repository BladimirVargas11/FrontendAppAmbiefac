import { Component } from '@angular/core';
import { cursos } from '../../../data/cursos';
import { CursoServiceService } from '../../../shared/services/curso.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-cursos',
  templateUrl: './client-cursos.component.html',
  styleUrls: ['./client-cursos.component.scss']
})
export class ClientCursosComponent {
  cursos = cursos;

  cursoSelecionado: any;

  constructor(private cursoService: CursoServiceService, private router:Router){}

  seleccionarCurso(curso:any){
   this.cursoService.setCurso(curso);
   this.router.navigate(['/academy/learning/course'])
  }

  


}
