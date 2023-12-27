import { Injectable } from '@angular/core';
import { rolesMapping } from '../Models/roles-mapping';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../Models/Login-models';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/Login.auth';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject: BehaviorSubject<string>;
  public isAuthenticated$: Observable<string>;

  private userLoggedInSubject: Subject<any> = new Subject<string>();; 
  public userLoggedIn$: Observable<any> = this.userLoggedInSubject.asObservable();

  url: string = environment.apiUrl;

  constructor(private http: HttpService<LoginResponse>,private route: Router) {
    const initialToken = localStorage.getItem("token") || '';
    this.isAuthenticatedSubject = new BehaviorSubject<string>(initialToken);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    // this.getClient()
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
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("id", data.id.toString());
        this.setAuthenticated(data.jwt);
        this.redirectToRoleView(data.role.name);
      }
    )
    return user;
  }
  private redirectToRoleView(role:string): void {
    if (this.isAuthenticated) {
      switch (role) {
        case 'ADMIN':
          this.route.navigate(['admin/']);
          break;
        case 'CLIENT':
          this.route.navigate(['academy/']);
          break;
        default:
          // Redirigir a una vista predeterminada si el rol no es admin ni client
          this.route.navigate(['/']);
          break;
      }
    }
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

  getClient(){
    let id = this.getUserId();
    return this.http.get(`${this.url}client/${id}`).subscribe((data:any)=>this.userLoggedInSubject.next(data));
  }
}
