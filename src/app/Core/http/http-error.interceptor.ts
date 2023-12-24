import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { errores } from '../Models/errors';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client error: ${error.error.message}`;
        } else if (error.status === 404) {
          errorMessage = 'Resource not found';
        } else if (error.status === 403) {
          errorMessage = 'Access denied';
        } else if (error.status === 500) {
          errorMessage = 'Server error';
        }
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: errorMessage,
            timer: 1500
          });
       
        return throwError(errorMessage);
      })
    );
  }
}
