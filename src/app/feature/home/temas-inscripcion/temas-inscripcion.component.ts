import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temas-inscripcion',
  templateUrl: './temas-inscripcion.component.html',
  styleUrls: ['./temas-inscripcion.component.scss']
})
export class TemasInscripcionComponent {
  //localStorage
  userLog = {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae2',
    name: "Ejemplo pepito"
  }
  cursoId: string = "";
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.cursoId = params['id'];
    });
  }

  navegarAInformacion() {
    (!this.userLog) ?
      this.router.navigate(['AMBIEFAC/tema/', this.cursoId])
      : this.router.navigate(['login'])
  }
}
