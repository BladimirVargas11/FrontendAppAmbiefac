import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Core/services/http.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = environment.apiUrl;
  constructor(private http: HttpService<any>) { }

  getTemas(): Observable<any> {
    return this.http.get(`${this.url}topic/all`)
  }
  getTemasById(id: string): Observable<any> {
    return this.http.get(`${this.url}topic/${id}`)
  }
  postIncribirte(inscripcion:any):Observable<any>{
    return this.http.post(`${this.url}client-topic/save`, inscripcion, true);
  }
  getClientById(id:number):Observable<any>{
      return this.http.get(`${this.url}client/${id}`)
  }
}
