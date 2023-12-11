import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../shared/services/curso.service';
import { Curso } from '../../shared/models/cursosModels';
import { data } from 'jquery';

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
  myIdCurso: number = 0;
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
    let curso = Curso.CursoDesdeObject(this.miFormulario.value)
    this.cursoService.addData(curso).subscribe(id => this.myIdCurso = id)
    this.OnSave = true
  }



  addContent = () => {
    // Resto de tu lógica para guardar el curso.
    console.log('si cambia', this.OnSave);
    let nameTema = 'Gestión Sostenible de Residuos';
    debugger
    this.router.navigate([`admin/temas-cruso/${this.myIdCurso}/${this.miFormulario.value.nombreCurso}`])

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
      id:[],
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
