import { Component, OnInit } from '@angular/core';
import { ErrorServiceService } from 'src/app/Core/services/error-service.service';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
titulo: string = 'Cursos';
error: string = '';
constructor(private errorService: ErrorServiceService) {
 
}
  
ngOnInit() {
  this.errorService.error$.subscribe((errorMessage) => {
    this.error = errorMessage;
    console.log(this.error);
  });

}

recibirTitulo(titulo: string) {
  this.titulo = titulo;
}
}
