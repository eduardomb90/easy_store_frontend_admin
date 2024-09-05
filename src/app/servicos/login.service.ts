import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { JWTToken } from '../model/JWTToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://localhost:8080/login';

  public logarUsuario(user: Usuario): Observable<JWTToken>{
    return this.http.post<JWTToken>(this.apiUrl, user);
  }
}
