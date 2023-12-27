import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../shared/services/examen.service';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-examen',
  templateUrl: './consultar-examen.component.html',
  styleUrls: ['./consultar-examen.component.scss']
})
export class ConsultarExamenComponent implements OnInit {
  addSubTema: any;
  titulo: string = "Examen";
  lisdata!: any[];
  /**
   *
  */
  constructor(
    private service: ExamenService,
    private route: Router,
    private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.getData();
  }
  private getData() {
    this.spinner.show();
    this.service.getAllTopic().subscribe((data: any) => this.lisdata = data.data);
    setTimeout(() => {
      console.log(this.lisdata);
      this.spinner.hide();
    }, 1000);
  }

  openExamen(id:any, idExamen:any) {
    this.route.navigate([`admin/agregar-preguntas/${id}`,{ examen: idExamen }])
  }
  verifyImage = (link:string):boolean => (link.startsWith('http://') ||link.startsWith('https://'))
}
