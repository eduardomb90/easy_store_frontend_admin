import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/Pedido';
import * as moment from 'moment';
import { FiltroPedidoDTO } from 'src/app/dto/FiltroPedidoDTO';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-ultimospedidos',
  templateUrl: './ultimospedidos.component.html',
  styleUrls: ['./ultimospedidos.component.css']
})
export class UltimospedidosComponent implements OnInit {

  public pedidos: Pedido[] = [];
  private filtroDTO: FiltroPedidoDTO = new FiltroPedidoDTO();

  constructor(private pedidoService: PedidoService) {
    this.filtroDTO.dataInicio = moment().subtract(70,'days').format("yyyy-MM-DD");
    this.filtroDTO.dataFim = moment().format("yyyy-MM-DD");

    this.pedidoService.getPedidosFiltrados(this.filtroDTO).subscribe({
      next: (res: Pedido[]) => {
        this.pedidos = res;
      },
      error: (err) => {
        console.log("Erro ao recuperar últimos pedidos. - "+ err);

      }
    })

  }

  ngOnInit(): void {
  }

}
