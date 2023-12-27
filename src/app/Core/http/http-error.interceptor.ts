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
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { ErrorServiceService } from '../services/error-service.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private auth:AuthenticationService,
    private errorService: ErrorServiceService,
    private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        let showMessage = false;
        switch (error.status) {
          case 400:
            debugger
            errorMessage = error.error.data.message;
            showMessage = true
            break;
          case 401:
            errorMessage = error.error.message;
            this.auth.logOut();
            this.route.navigate(['auth/'])
            showMessage = true
            break;
          case 403:
            errorMessage = 'Access denied';
            this.auth.logOut();
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Server error';
            break;
          default:
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Client error: ${error.error.message}`;
            }
        }
          if(showMessage)
            Swal.fire({
              title: 'Error!',
              icon: 'error',
              text: errorMessage,
              timer: 1500
            });
          
          this.errorService.showError({message: errorMessage, status:error.status });
       
        return throwError(errorMessage);
      })
    );
  }
}
