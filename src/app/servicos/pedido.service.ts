import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/Pedido';
import { Observable } from 'rxjs';
import { VendasPorDataDTO } from '../dto/VendasPorDataDTO';
import { FiltroPedidoDTO } from '../dto/FiltroPedidoDTO';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = "http://localhost:8080/pedido"
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {
    this.headers = this.token.tokenAutorization();
  }

  public getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl, { headers: this.headers });
  }

  public alterarStatus(idPedido: number, status: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${idPedido}?status=${status}`, { headers: this.headers });
  }

  public recuperarTotaisDoMes(): Observable<VendasPorDataDTO[]> {
    return this.http.get<VendasPorDataDTO[]>(`${this.apiUrl}/recentes`, { headers: this.headers });
  }

  public getPedidosFiltrados(filtro: FiltroPedidoDTO): Observable<Pedido[]> {
    return this.http.post<Pedido[]>(`${this.apiUrl}/filtrar`, filtro, { headers: this.headers });
  }
}
