import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-cruso',
  templateUrl: './agregar-cruso.component.html',
  styleUrls: ['./agregar-cruso.component.scss']
})
export class AgregarCrusoComponent implements OnInit {
  titulo: string = 'Agregar curso';
  OnSave: boolean = false;
  rutaId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  AddCurso = () => {
    this.OnSave = true;
    console.log('si cambia', this.OnSave);
    // Resto de tu lógica
  }

  addContent() {
    let idCurso = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    let nameTema = 'Gestión Sostenible de Residuos';
    this.router.navigate([`admin/temas-cruso/${idCurso}/${nameTema}`])
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rutaId = params.get('id');
      if (this.rutaId) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }
}
