import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem("EASTk")){
      this.route.navigate(['/']);
    }

    this.categoriaService.getAllCategorias().subscribe({
      next: (res: Categoria[]) => {
        this.categorias = res.sort((a, b) => a.id - b.id);
      },
      error: (err) => {
        this.route.navigate(['/']);
      }
    });
  }

}
