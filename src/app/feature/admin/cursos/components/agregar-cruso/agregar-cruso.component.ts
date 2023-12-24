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
    if (this.miFormulario.invalid) {
      this.hasEmptyFields();
      return;
    }
    let curso = this.miFormulario.value
    this.cursoService.postTopic(curso).subscribe(id => {
      this.changeValues(id);
    })

  }



  addContent = () => {
    this.router.navigate([`admin/temas-cruso/${this.myIdCurso}/${this.miFormulario.value.name}`])
  }

  private changeValues(id: any) {
    debugger
    this.titulo = "Detalle del curso"
    this.myIdCurso = id.data.topicId;
    this.OnSave = true;
    this.miFormulario.disable();
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
      id: [],
      name: ['', Validators.required],
      linkImage: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
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
