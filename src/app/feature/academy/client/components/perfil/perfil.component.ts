import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/feature/admin/cursos/shared/services/curso.service';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { data } from 'jquery';
import { ProfileModel } from '../../shared/models/profileModel';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  rutaId: string | null = null;
  miFormulario!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService, 
    private authService:AuthenticationService) { }

  AddCurso = () => {
    if (this.miFormulario.invalid) {
      this.hasEmptyFields();
      return;
    }
    console.log(this.miFormulario.value)
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
    this.getProfile();
  }
  getProfile() {
   this.profileService.get('1').subscribe(
    (data)=> this.setValues(data)
   )
  }
  setValues(data: ProfileModel): void {
    console.log(data);
    
  }

  private formBuilders() {
    this.miFormulario = this.formBuilder.group({
      id:[],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
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
