import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
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
    private service: AuthenticationService) {
    
    this.formBuilder();
  }
  ngOnInit() {
 
  }
  private formBuilder() {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  campoTieneError(campo: string): boolean {
    const control = this.formGroup.get(campo);
    return control?.invalid && control?.touched || false;
  }
  logIn(){
    if (this.formGroup?.valid) {
      let logInModel = LoginRegister.DesdeObject(this.formGroup?.value);
      console.log(logInModel)
      this.service.logIn(logInModel);
      
    }
  }
}
