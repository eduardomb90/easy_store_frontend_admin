import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompradorDTO } from 'src/app/dto/CompradorDTO';
import { Produto } from 'src/app/model/Produto';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { ProdutoService } from 'src/app/servicos/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  public produtos: Produto[] = [];
  public compradores: CompradorDTO[] = [];

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.produtoService.recuperarTodos().subscribe({
      next: (res: Produto[]) => {
        this.produtos = res;
      },
      error: () => {}
    });
  }

  public destaca(produto: Produto) {
    console.log("Destacando " + produto.id + " status: "+ produto.destaque);
    produto.destaque = (produto.destaque)? 1:0;
    this.produtoService.atualizarProduto(produto).subscribe({
      next: (res: Produto) => {
        console.log(res);
      },
      error: (err) => {
        console.log("Erro "+ err);
      }
    });
  }

  public disponibiliza(produto: Produto) {
    produto.disponivel = (produto.disponivel)? 1:0;
    console.log("Disponibilizando " + produto.id + " disponivel: " + produto.disponivel);
    this.produtoService.atualizarProduto(produto).subscribe({
      next: (res: Produto) => {
        console.log(res);
      },
      error: (err) => {
        console.log("Erro "+ err);
      }
    });
  }

  public buscarCompradores(idProduto: number){
    this.clienteService.buscarCompradores(idProduto).subscribe({
      next: (res: CompradorDTO[]) => {
        this.compradores = res;
        console.log(this.compradores);
        this.mostrarCompradores();
      },
      error: (err) => {
        console.log("ERRO "+ err);

      }
    })

  }

  public mostrarCompradores(){
    document.getElementById("btnModal")?.click();
  }

}
