import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { CompradorDTO } from '../dto/CompradorDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = "http://localhost:8080/cliente"
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {
    this.headers = this.token.tokenAutorization();
  }

  public recuperarTodos(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl, { headers: this.headers });
  }

  public buscarPorLetra(letra: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/nome/${letra}`, { headers: this.headers });
  }

  public buscarCompradores(idProduto: number): Observable<CompradorDTO[]> {
    return this.http.get<CompradorDTO[]>(`${this.apiUrl}/compras/${idProduto}`, { headers: this.headers })
  }

  public buscarAniversariantes(mes: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/aniversario/${mes}`, { headers: this.headers });
  }
}
