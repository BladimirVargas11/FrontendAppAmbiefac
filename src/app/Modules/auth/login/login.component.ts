import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Login } from 'src/app/Core/Models/Login-models';
import { AuthenticationService } from 'src/app/Core/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AuthenticationService) {
    
    this.formBuilder();
  }
  ngOnInit() {
 
  }
  private formBuilder() {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  campoTieneError(campo: string): boolean {
    const control = this.formGroup.get(campo);
    return control?.invalid && control?.touched || false;
  }
  logIn(){
    if (this.formGroup?.valid) {
      let logInModel = Login.DesdeObject(this.formGroup?.value);
      this.service.logIn(logInModel);
    }
  }
}
