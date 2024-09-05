import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = "http://localhost:8080/usuario";
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {
    this.headers = this.token.tokenAutorization();
  }

  public recuperarTodods(): Observable<Usuario[]> {
    const headers = this.token.tokenAutorization();

    return this.http.get<Usuario[]>(this.apiUrl, { headers });
  }

  public recuperarUsuarioPeloId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  public atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = this.token.tokenAutorization();

    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario, { headers });
  }

  public criarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.headers });
  }
}
