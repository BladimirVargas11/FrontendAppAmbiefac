import { Injectable } from '@angular/core';
import { rolesMapping } from '../Models/roles-mapping';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../Models/Login-models';
import { environment } from 'src/environments/environment.development';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/Login.auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return true;
  }

  public logIn(logInModel: Login):Observable<LoginResponse>{
  
    
    const body = {username:logInModel.username,password:logInModel.password}
    console.log(body);
    return this.http.post<LoginResponse>(`http://localhost:8080/auth/login`,body).pipe(
      tap(data=> {
        localStorage.setItem("token",data.jwt);
        localStorage.setItem("id",data.id.toString());
      })
    );
  }
  
  get getToken(): string {
    return 'TOKEN';
  }
}
