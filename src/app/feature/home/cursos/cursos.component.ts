import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../shared/services/home.service';
import { data } from 'jquery';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  curosos: any[] = []
  constructor(private router: Router, private service:HomeService) { }
  ngOnInit(): void {
   this.service.getTemas().subscribe((data:any)=> this.curosos = data.data)
  }
  navegarAInformacion(id: string) {
    this.router.navigate(['inscripcion/', id]);
  }
  verifyImage = (link:string):boolean => (link.startsWith('http://') ||link.startsWith('https://'))
}
