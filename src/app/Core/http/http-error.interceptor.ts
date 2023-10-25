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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors (e.g., log, show error messages)
        console.error('HTTP Error:', error);

        // Buscar el error en la lista
        const errorItem = errores.find(item => item.status === error.status);
        
        // Redirigir a la página de error específica si el error está en la lista
        if (errorItem) {
          // Redirigir a una página específica (por ejemplo, 'error/:status/:message')
          // en este caso seria components errors
        }

        return throwError(error);
      })
    );
  }
}
