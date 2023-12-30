import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../shared/services/home.service';
import { data, error } from 'jquery';
import { Tema } from '../shared/models/tema';
import { ConfirmationService } from 'src/app/Core/services/confirmation.service';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-temas-inscripcion',
  templateUrl: './temas-inscripcion.component.html',
  styleUrls: ['./temas-inscripcion.component.scss']
})
export class TemasInscripcionComponent implements OnInit {
  cursoId: string = "";
  isEnrolled : boolean = false;
  tema: Tema = {
    id: 0,
    name: "",
    description: "",
    time: "",
    linkImage: "",
    exam_id: 0,
    subtopic: []
  };
  nivelCurso: string = "Básico";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HomeService,
    private confirmationService: ConfirmationService,
    private auth: AuthenticationService) {
    this.route.params.subscribe(params => {
      this.cursoId = params['id'];
    });
  }
  ngOnInit(): void {
    this.getTema();

  }
  getTema() {
    this.service.getTemasById(this.cursoId).subscribe((data: any) => this.tema = data.data)
    setTimeout(() => {
      this.setNivelCurso()
    }, 1000);

  }
  navegarAInformacion() {
    if(this.auth.getUserId()){
      this.confirmAction();
    }
    else{
      this.router.navigate(['auth/login'])
    }
  }

  verifyImage = (link: string): boolean => (link.startsWith('http://') || link.startsWith('https://'));

  confirmAction(): void {
    const message = '¿Estás seguro de que deseas inscribirte en este tema?';
    this.confirmationService.openConfirmationModal(message).then((confirmed: boolean) => {
      if (confirmed) {
        this.service.postIncribirte({ idClient: this.auth.getUserId(), idTopic: this.cursoId }).subscribe(
          () => {

          },
        (error) => {

          }
        )
        console.log('Acción confirmada');
      } else {
        console.log('Acción cancelada');
      }
    });
  }
  setNivelCurso() {
    const nivelBasico = 1;
    const nivelIntermedio = 2;
    const match = this.tema.time.match(/\d+/);
    const horas = match ? parseInt(match[0]) : 0;
    console.log("horas", horas);


    if (horas < nivelBasico) {
      this.nivelCurso = 'Básico';
    } else if (horas <= nivelIntermedio) {
      this.nivelCurso = 'Intermedio';
    } else {
      this.nivelCurso = 'Avanzado';
    }
  }
}
