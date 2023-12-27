import { Component, OnInit } from '@angular/core';
import { tabs } from '../../shared/models/tabsModels';
import { Client, initialClient } from 'src/app/feature/components/models/client';
import { Response } from 'src/app/feature/components/models/response';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';



@Component({
  selector: 'app-mi-aprendizaje',
  templateUrl: './mi-aprendizaje.component.html',
  styleUrls: ['./mi-aprendizaje.component.scss']
})
export class MiAprendizajeComponent implements OnInit {
  tabs = tabs
  response: Response<Client> = initialClient;

  /**
   *
   */
  constructor(private auth: AuthenticationService) {

  }
  ngOnInit(): void {
    this.auth.getClient();
    this.auth.userLoggedIn$.subscribe((data: any) => {
      this.response = data
    }
    )
    
  }
  selectedTab: string = 'perfil';
  onTabSelected(tab: string): void {
    this.selectedTab = tab;
  }

}
