import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { VendasPorDataDTO } from 'src/app/dto/VendasPorDataDTO';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-graficovendas',
  templateUrl: './graficovendas.component.html',
  styleUrls: ['./graficovendas.component.css']
})
export class GraficovendasComponent implements OnInit {
  public totais: VendasPorDataDTO[] = [];

  constructor(private pedidoService: PedidoService) {
    Chart.register(...registerables);  // Registre todos os componentes do Chart.js
  }

  ngOnInit(): void {
    this.pedidoService.recuperarTotaisDoMes().subscribe({
      next: (res: VendasPorDataDTO[]) => {
        this.totais = res;
        this.gerarGrafico();
      },
      error: (err) => {
        console.error('Erro ao recuperar dados de vendas', err);
      }
    });
  }

  public gerarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const dataLabels = this.totais.map(item => item.data);
    const dataValues = this.totais.map(item => item.total);

    new Chart(ctx, {
      type: 'bar', // 'line', 'bar', 'pie', etc.
      data: {
        labels: dataLabels,
        datasets: [{
          label: 'Vendas por Data',
          data: dataValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {

          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
