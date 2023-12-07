import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../shared/services/curso.service';

@Component({
  selector: 'app-agregar-cruso',
  templateUrl: './agregar-cruso.component.html',
  styleUrls: ['./agregar-cruso.component.scss']
})
export class AgregarCrusoComponent implements OnInit {
  titulo: string = 'Agregar curso';
  OnSave: boolean = false;
  rutaId: string | null = null;
  miFormulario!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cursoService: CursoService) { }

  AddCurso = () => {
    console.log('si cambia', this.OnSave);
    if (this.miFormulario.invalid) {
      this.hasEmptyFields();
      return;
    }
    console.log(this.miFormulario.value)
    this.cursoService.addData(this.miFormulario.value)
    this.OnSave = true
  }



  addContent = () => {
    // Resto de tu lógica para guardar el curso.
    console.log('si cambia', this.OnSave);
    let idCurso = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    let nameTema = 'Gestión Sostenible de Residuos';
    this.router.navigate([`admin/temas-cruso/${idCurso}/${nameTema}`])

  }

  private hasEmptyFields() {
    const firstInvalidControl = Object.keys(this.miFormulario.controls).find(
      control => this.miFormulario.get(control)?.invalid
    );
    if (firstInvalidControl) {
      const element = document.getElementById(firstInvalidControl);
      if (element) {
        element.focus();
      }
    }
  }

  ngOnInit(): void {
    this.getParams();
    this.formBuilders();
  }

  private formBuilders() {
    this.miFormulario = this.formBuilder.group({
      nombreCurso: ['', Validators.required],
      imagen: ['', Validators.required],
      tiempo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  private getParams() {
    this.route.paramMap.subscribe(params => {
      this.rutaId = params.get('id');
      if (this.rutaId) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }
}
