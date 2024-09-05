import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public tokenAutorization (): HttpHeaders {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return headers;
  }
}
