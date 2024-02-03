import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { HomeService } from '../../home/shared/services/home.service';
import { Client, initialClient } from '../models/client';
import { Response } from '../models/response';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent {

  response: Response<Client> = initialClient;

  isMyLearningRoute: boolean = false;
  showUserDropdown: boolean = false;


  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.getClient();
    this.getClient()
    this.routerActive.url.subscribe(segments => {
      this.isMyLearningRoute = segments.length > 0 && segments[0].path === "my-learning";
    })
  }

  navigateTo() {
    this.route.navigate(['/'])
  }

  getClient() {
    const id = this.auth.getUserId();
    this.auth.userLoggedIn$.subscribe((data: any) => {
      this.response = data
    })
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }
  logOut(){
    this.auth.logOut();
    this.route.navigate(['/'])
  }
}
