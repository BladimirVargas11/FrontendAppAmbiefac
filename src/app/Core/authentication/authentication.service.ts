import { Injectable } from '@angular/core';
import { rolesMapping } from '../Models/roles-mapping';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/Login-models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return true;
  }
  public logIn(logInModel: Login){
    this.http.get<any>(environment.apiUrl).subscribe(a=> console.log(a));
  }
  get getToken(): string {
    return 'TOKEN';
  }
}
