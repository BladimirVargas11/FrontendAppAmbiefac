import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private http: HttpClient) { }

  private showMessage(icon: 'success' | 'error', title?: string, message?: string): void {
    const defaultSuccessTitle = 'Success!';
    const defaultErrorTitle = 'Error!';
    const defaultSuccessMessage = 'Operation successful';
    const defaultErrorMessage = 'An error occurred';
    Swal.fire({
      title: title || (icon === 'success' ? defaultSuccessTitle : defaultErrorTitle),
      icon,
      text: message || (icon === 'success' ? defaultSuccessMessage : defaultErrorMessage),
      timer: 1500
    });
  }
  getToken(): string {
    return localStorage.getItem("token") || '';
  }
  private getRequestOptions(showToken: boolean = true): any {
    let token = this.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (showToken) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return  headers ;
    
  }
  private handleResponse<T>(observable: Observable<T>, showMessage: boolean, title?: string, message?: string): Observable<T> {
    return observable.pipe(
      tap(
        (response: T) => {
          if (showMessage) {
            this.showMessage('success', title, message);
          }
        }
      )
    );
  }
  get<T>(url: string, showMessage: boolean = true, title?: string, message?: string): Observable<T> {
    const requestOptions = this.getRequestOptions();
    debugger
    const observable = this.http.get<T>(url, {headers: requestOptions});
    return this.handleResponse(observable, showMessage,  title, message);
  }
  post<T>(url: string, body: any, showMessage: boolean = true, title?: string, message?: string): Observable<T> {
    const observable = this.http.post<T>(url, body);
    return this.handleResponse(observable, showMessage, title, message);
  }

  put<T>(url: string, body: any, showMessage: boolean = true, title?: string, message?: string): Observable<T> {
    const observable = this.http.put<T>(url, body);
    return this.handleResponse(observable, showMessage, title, message);
  }

  delete<T>(url: string, showMessage: boolean = true, title?: string, message?: string): Observable<T> {
    const observable = this.http.delete<T>(url);
    return this.handleResponse(observable, showMessage, title, message);
  }
}

