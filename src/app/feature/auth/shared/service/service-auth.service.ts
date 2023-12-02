import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {
  private apiUrl = 'https://localhost:7269/api/Activity'; // Reemplaza esto con tu URL de la API

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
