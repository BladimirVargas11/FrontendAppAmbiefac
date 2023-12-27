import { Component, Input } from '@angular/core';
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
  @Input() data: any = {};
  rutaId: number = 0;
  miFormulario!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,) { }

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
    this.formBuilders();
    this.setValues();
    
  }


 
  setValues(): void {
   this.miFormulario.setValue({
    id: this.data.id,
    nombre: this.data.fullName.split(" ")[0],
    apellido: this.data.fullName.split(" ")[1], 
    correo: this.data.credentials.email,
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


}
