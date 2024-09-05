import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-editorcategoria',
  templateUrl: './editorcategoria.component.html',
  styleUrls: ['./editorcategoria.component.css']
})
export class EditorcategoriaComponent implements OnInit {

  public categoria: Categoria = new Categoria();
  public id!: string;
  public mode!: number; // modo 0 = POST  modo 1 = PUT

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private route: Router
  ) {
    let id = this.activatedRoute.snapshot.params['id'];

    if(id === 'new'){
      this.mode = 0;
    }
    else{
      this.mode = 1;
      this.categoriaService.getById(id).subscribe({
        next: (res: Categoria) => {
          if(res)
            this.categoria = res;
        },
        error: (err) => {
          console.log(err.message + "\nErro ao recuperar categoria.");

          if(err.status == 404){

          }
          else {
            localStorage.removeItem("EASTk");
            this.route.navigate(['/']);
          }
        }
      });
    }
  }

  ngOnInit(): void {

  }

  public atualizarCategoria() {
    if(this.mode == 0) {
      return this.categoriaService.incluirNovaCategoria(this.categoria).subscribe({
        next: (res: Categoria) => {
          console.log("Categoria incluída "+ res);
          this.route.navigate(['/categorias']);
        },
        error: (err) => {
          if(err.status == 400){
            alert("Valores inválidos");
          }
          else{
            localStorage.removeItem("EASTk");
            this.route.navigate(['/']);
          }
        }
      });
    }
    else if(this.mode == 1) {
      return this.categoriaService.atualizarCategoria(this.categoria).subscribe({
        next: (res: Categoria) => {
          console.log("Categoria incluída "+ res);
          this.route.navigate(['/categorias']);
        },
        error: (err) => {
          if(err.status == 400){
            alert("Valores inválidos");
          }
          else{
            localStorage.removeItem("EASTk");
            this.route.navigate(['/']);
          }
        }
      });
    }

    return ;
  }

}
