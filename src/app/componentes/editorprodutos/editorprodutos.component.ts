import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { FileEntity } from 'src/app/model/FileEntity';
import { Produto } from 'src/app/model/Produto';
import { CategoriaService } from 'src/app/servicos/categoria.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-editorprodutos',
  templateUrl: './editorprodutos.component.html',
  styleUrls: ['./editorprodutos.component.css']
})
export class EditorprodutosComponent implements OnInit{

  public produto: Produto = new Produto();
  public listaCategoria: Categoria[] = [];
  public id!: string;
  public mode!: number;
  public arquivo: File | null = null;
  public destaque!: boolean;
  public disponivel!: boolean;
  public result: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private route: Router
  ) {
    let id = this.activatedRoute.snapshot.params['id'];

    if(id === 'new'){
      this.mode = 0;
    }
    else{
      this.mode = 1;
      this.produtoService.getById(id).subscribe({
        next: (res: Produto) => {
          if(res){
            this.produto = res;
            this.produto.categoria = res.categoria;
            this.disponivel = (this.produto.disponivel == 1) ? true:false;
            this.destaque = (this.produto.destaque == 1) ? true:false;
          }
        },
        error: (err) => {
          console.log(err.message + "\nErro ao recuperar produto.");

          if(err.status == 404){

          }
          else {
            localStorage.removeItem("EASTk");
            this.route.navigate(['/']);
          }
        }
      });
    }

    this.categoriaService.getAllCategorias().subscribe({
      next: (res: Categoria[]) => {
        this.listaCategoria = res;
      }
    });
  }

  ngOnInit(): void {

  }

  public atualizarProduto() {

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Aqui, o objeto File é obtido
    if (file) {
      this.arquivo = file; // O objeto File é armazenado na propriedade selectedFile
      console.log(this.arquivo);
    }
  }

  public uploadFoto() {
    if (this.arquivo) {
      const formData = new FormData();
      formData.append("file", this.arquivo, this.arquivo.name); // O objeto File é adicionado ao FormData
      console.log(this.arquivo.name);

      this.produtoService.uploadFoto(formData).subscribe({
        next: (response: FileEntity) => {
          console.log('Upload successful', response);
          this.produto.linkFoto = `assets/images/${response.path}`;
          console.log(this.produto.linkFoto);
        },
        error: (err) => console.error('Upload error', err)
      });
    }
  }

  public inserirProduto() {
    this.produto.destaque = (this.destaque) ? 1:0;
    this.produto.disponivel = (this.disponivel) ? 1:0;

    if(this.mode == 0){
      this.produtoService.enviarProduto(this.produto).subscribe({
        next: (res: Produto) => {
          this.result = 1;
          console.log("Produto inserido com sucesso");

          this.route.navigate(['/produtos']);
        },
        error: (err) => {
          console.log("Erro ao tentar inserir produto. ", err);
          this.result = -1;
        }
      });

    } else {// atualizar produto
      this.produto.destaque = (this.destaque) ? 1:0;
      this.produto.disponivel = (this.disponivel) ? 1:0;
      this.produtoService.atualizarProduto(this.produto).subscribe({
        next: (res: Produto) => {
          this.result = 1;
          console.log("Produto atualizado com sucesso");
          this.route.navigate(['/produtos']);
        },
        error: (err) => {
          console.log("Erro ao tentar atualizar produto. ", err);
          this.result = -1;
        }
      });
    }
  }
}
