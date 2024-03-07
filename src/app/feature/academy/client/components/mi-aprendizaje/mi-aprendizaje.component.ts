import { Component, OnInit } from '@angular/core';
import { tabs } from '../../shared/models/tabsModels';
import { Client, initialClient } from 'src/app/feature/components/models/client';
import { Response } from 'src/app/feature/components/models/response';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { ProfileService } from '../../shared/services/profile.service';




@Component({
  selector: 'app-mi-aprendizaje',
  templateUrl: './mi-aprendizaje.component.html',
  styleUrls: ['./mi-aprendizaje.component.scss']
})
export class MiAprendizajeComponent implements OnInit {
  tabs = tabs
  response: Response<Client> = initialClient;

  cursos: any[] = [];
  scoreT = 100;
  constructor(private service: ProfileService, private auth: AuthenticationService) {

  }
  ngOnInit(): void {
    this.auth.getClient();
    this.auth.userLoggedIn$.subscribe((data: any) => {
      this.response = data
    }
    )
    this.getCursos();
  }

  selectedTab: string = 'Perfil';
  onTabSelected(tab: string): void {
    this.selectedTab = tab;
  }

  getCursos() {
let id = this.auth.getUserId();
  this.service.getClientCourse(id || 0).subscribe((data: any) => {
    this.cursos = data.data;
    let cursosConScoreUno = this.cursos.filter(curso => curso.score > 0);
    this.scoreT = cursosConScoreUno.length;
  });
  }

}
