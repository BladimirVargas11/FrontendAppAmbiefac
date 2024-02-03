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
  private isAuthObject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  
  public isAuthenticated$: Observable<string>;
  private readonly localStorageKey = 'authData';
  private userLoggedInSubject: Subject<any> = new Subject<string>();;
  public userLoggedIn$: Observable<any> = this.userLoggedInSubject.asObservable();

  url: string = environment.apiUrl;

  constructor(private http: HttpService<LoginResponse>, private route: Router) {
    const initialToken = localStorage.getItem("token") || '';
    this.isAuthenticatedSubject = new BehaviorSubject<string>(initialToken);
    
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    // this.getClient()
  }

  get isAuthenticated(): string {
    const userData = this.getUserData();
    return userData ? userData.token : '';
  }

  private setAuthenticated(token: string): void {
    this.isAuthenticatedSubject.next(token);
  }
   getLoggedInUser(): Observable<any> {
    return this.isAuthObject.asObservable();
  }

  private setUser(user:any){
    this.isAuthObject.next(user);
  }
  register(UserModel: any): Observable<any> {
    return this.http.post<LoginResponse>(`${this.url}auth/register`, UserModel, true);
  }

  logIn(logInModel: Login): Observable<LoginResponse> {
    const body = { username: logInModel.username, password: logInModel.password };
    let titulo = "Bienvenido";

    const user = this.http.post<LoginResponse>(`${this.url}auth/login`, body, true, titulo);

    user.subscribe(
      (data) => {
        const userData = {
          token: data.jwt,
          id: data.id,
          role: data.role.name
        };

        localStorage.setItem("user", JSON.stringify(userData));
        this.setAuthenticated(userData.token);
        this.setUser(userData);
        this.redirectToRoleView(userData.role);
      }
    );

    return user;
  }

  private redirectToRoleView(role: string): void {
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
    localStorage.removeItem("user");
    this.setAuthenticated('');
  }

  getToken(): string {
    const userData = this.getUserData();
    return userData ? userData.token : '';
  }

  getUserId(): number | null {
    const userData = this.getUserData();
    return userData ? userData.id : null;
  }
  get getRole():string | null {
    const userData = this.getUserData();
    return userData ? userData.role : null;
  }

  getClient() {
    let id = this.getUserId();
    return this.http.get(`${this.url}client/${id}`).subscribe((data: any) => this.userLoggedInSubject.next(data));
  }
  private getUserData() {
    const userDataString = localStorage.getItem("user");
    return userDataString ? JSON.parse(userDataString) : null;
  }

}
