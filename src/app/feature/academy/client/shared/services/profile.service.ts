import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Core/services/http.service';
import { ProfileModel } from '../models/profileModel';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  endpoint: string = "client/"
  url: string = environment.apiUrl
  constructor(private http: HttpService<ProfileModel>) { }

  get(id:number):Observable<ProfileModel>{
    const fullUrl = `${this.url}${this.endpoint}${id}`;
    return this.http.get<ProfileModel>(fullUrl, false);
  }

  getClientCourse(id:number):Observable<any>{
    return this.http.get(`${this.url}client-topic/courses/${id}`)
  }
}
