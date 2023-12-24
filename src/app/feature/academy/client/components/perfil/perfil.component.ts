import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/feature/admin/cursos/shared/services/curso.service';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';
import { data } from 'jquery';
import { ProfileModel } from '../../shared/models/profileModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  rutaId: number = 0;
  miFormulario!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profileService: ProfileService, 
    private authService:AuthenticationService,
    private http:HttpClient) { }

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
    this. getProfile();
    
  }
  getDatosConToken() {
    const token = localStorage.getItem("token") || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
     this.http.get<any>(`http://localhost:8080/client/1`, { headers }).subscribe(data=>console.log(data))
  }

  getProfile() {
    const id = localStorage.getItem("id") || '';
   this.profileService.get(parseInt(id ?? '0')).subscribe(
    (data:any)=> {
      this.setValues(data.data)
    }
   )
  }
  setValues(data: ProfileModel): void {
   this.miFormulario.setValue({
    id: data.id,
    nombre: data.fullName.split(" ")[0],
    apellido: data.fullName.split(" ")[1], 
    correo: data.credentials.email,
    telefono: ""
   })
   this.miFormulario.disable();
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
      this.rutaId = parseInt(params.get('id') ?? '0');
      if (this.rutaId) {
        console.log('ID de la ruta:', this.rutaId);
      }
    });
  }
}
