import { Injectable } from '@angular/core';
import { rolesMapping } from '../Models/roles-mapping';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  public isAuthenticated(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return true;
  }

  get getToken(): string {
    return 'TOKEN';
  }
}
