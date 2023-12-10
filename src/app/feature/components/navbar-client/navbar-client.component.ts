import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent {

  isMyLearningRoute: boolean = false;

  constructor(private routerActive: ActivatedRoute){}

  ngOnInit(): void {
    this.routerActive.url.subscribe(segments=>{
      this.isMyLearningRoute = segments.length > 0 && segments[0].path === "my-learning";
    })
  }



}
