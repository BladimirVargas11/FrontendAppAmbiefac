import { Injectable } from '@angular/core';
import { rolesMapping } from '../Models/roles-mapping';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../Models/Login-models';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/Login.auth';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject: BehaviorSubject<string>;
  public isAuthenticated$: Observable<string>;
  url: string = environment.apiUrl;

  constructor(private http: HttpService<LoginResponse>) {
    const initialToken = localStorage.getItem("token") || '';
    this.isAuthenticatedSubject = new BehaviorSubject<string>(initialToken);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  get isAuthenticated(): string {
    return this.isAuthenticatedSubject.value;
  }

  private setAuthenticated(token: string): void {
    this.isAuthenticatedSubject.next(token);
  }

  logIn(logInModel: Login): Observable<LoginResponse> {
    const body = { username: logInModel.username, password: logInModel.password };
    let titulo = "Bienvenido"
    const user = this.http.post<LoginResponse>(`${this.url}auth/login`, body, true, titulo); 
    user.subscribe(
      (data) => {
        debugger
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("id", data.id.toString());
        this.setAuthenticated(data.jwt);
      }
    )
    return user;
  }

  logOut(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.setAuthenticated('');
  }

  getToken(): string {
    return localStorage.getItem("token") || '';
  }

  getUserId(): number | null {
    const idString = localStorage.getItem("id");
    return idString ? parseInt(idString, 10) : null;
  }
}
