import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../model/Pedido';
import { PedidoService } from 'src/app/servicos/pedido.service';
import { Cliente } from 'src/app/model/Cliente';
import { FiltroPedidoDTO } from 'src/app/dto/FiltroPedidoDTO';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public pedidos: Pedido[] = [];
  public detalhe: Pedido = new Pedido();
  public filtroPedido: FiltroPedidoDTO = new FiltroPedidoDTO();
  public pago!: boolean;
  public entregue!: boolean;
  public cancelado!: boolean;
  public filtrosVisiveis: boolean = false;  // Controle de visibilidade dos filtros


  constructor(private pedidoService: PedidoService) {
    this.detalhe.cliente = new Cliente();

    this.pedidoService.getAllPedidos().subscribe({
      next: (res: Pedido[]) => {
        this.pedidos = res;
      },
      error: (err) => {console.log("ERROR "+ err);
      }
    });
  }

  ngOnInit(): void {}

  public toggleFiltros() {
    this.filtrosVisiveis = !this.filtrosVisiveis;
  }

  public alterarStatus(idPedido: number, status: number){
    this.pedidoService.alterarStatus(idPedido, status).subscribe({
      next: (res: Pedido) => {
        console.log(res);
      },
      error: (err) => {
        console.log("ERRO "+ err);
      }
    });

  }

  public enviarDetalhes(pedido: Pedido){
    this.detalhe = pedido;
    document.getElementById("btnModal")?.click();
  }

  public filtrarPedidos() {

    console.log(this.filtroPedido);

    this.filtroPedido.pago = (this.pago == true) ? 1:0;
    this.filtroPedido.entregue = (this.entregue == true) ? 1:0;
    this.filtroPedido.cancelado = (this.cancelado == true) ? 1:0;

    this.pedidoService.getPedidosFiltrados(this.filtroPedido).subscribe({
      next: (res: Pedido[]) => {
        this.pedidos = res;
      },
      error: (err) => {
        console.log("ERRO "+ err);
      }
    });
  }

  public limparFiltro() {
    this.filtroPedido = new FiltroPedidoDTO();
  }
}
