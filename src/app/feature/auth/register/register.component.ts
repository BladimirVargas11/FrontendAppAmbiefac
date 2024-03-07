import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Login, LoginRegister } from 'src/app/Core/Models/Login-models';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AuthenticationService, private router: Router) {

    this.formBuilder();
  }
  ngOnInit() {

  }

  generarCorreoRandom() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let correo = '';
    for (let i = 0; i < 10; i++) {
      correo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    correo += '@example.com'; // Puedes cambiar 'example.com' por el dominio que desees
    return correo;
  }





  private formBuilder() {

  const correoAleatorio = this.generarCorreoRandom();
    
    this.formGroup = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: correoAleatorio,
      fullName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  campoTieneError(campo: string): boolean {
    const control = this.formGroup.get(campo);
    return control?.invalid && control?.touched || false;
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }

  register() {
    if (this.formGroup?.valid) {
      let logInModel = LoginRegister.DesdeObject(this.formGroup?.value);
      console.log(logInModel);
      this.service.register(logInModel).subscribe(() => {
        this.router.navigate(['/auth/login'])
      });
    } else {
      
    }
  }
  
}
