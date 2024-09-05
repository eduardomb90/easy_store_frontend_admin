import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  public getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  public getById(id: number): Observable<Categoria> {
    //É preciso enviar o token
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    let header = {'Authorization': token};

    return this.http.get<Categoria>(`${this.apiUrl}/${id}`, { headers: header });
  }

  public incluirNovaCategoria(categoria: Categoria): Observable<Categoria> {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    let header = {'Authorization': token};

    return this.http.post<Categoria>(this.apiUrl, categoria, { headers: header});
  }

  public atualizarCategoria(categoria: Categoria) {
    let token: string|null;
    token = localStorage.getItem("EASTk");

    if (!token) {
      throw new Error('Token não encontrado');
    }

    let header = {'Authorization': token};

    return this.http.put<Categoria>(this.apiUrl, categoria, { headers: header});
  }
}
