import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';
import { FileEntity } from '../model/FileEntity';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = "http://localhost:8080/produto"

  constructor(private http: HttpClient) { }

  public recuperarTodos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.apiUrl}/todos`);
  }

  public getById(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  public uploadFoto(formData: FormData): Observable<FileEntity> {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.post<FileEntity>(`${this.apiUrl}/upload`, formData, { headers });
  }

  public enviarProduto(produto: Produto): Observable<Produto> {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.post<Produto>(this.apiUrl, produto, { headers });
  }

  public atualizarProduto(produto: Produto): Observable<Produto> {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto, { headers });
  }
}
