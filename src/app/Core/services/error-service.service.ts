import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {
  private errorSubject = new Subject<any>();

  constructor() { }

  error$ = this.errorSubject.asObservable();

  showError(errorMessage: any) {
    this.errorSubject.next(errorMessage);
  }
}
