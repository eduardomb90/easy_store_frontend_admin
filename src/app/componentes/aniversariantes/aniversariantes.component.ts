import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/servicos/cliente.service';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css']
})
export class AniversariantesComponent implements OnInit {

  public meses: string[] = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  public mesSelecionado: number = new Date().getMonth() + 1; // Mês atual
  public aniversariantes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {
    this.carregarAniversariantes(this.mesSelecionado);
  }

  ngOnInit(): void {}

  private carregarAniversariantes(mes: number): void {
    this.clienteService.buscarAniversariantes(mes).subscribe({
      next: (res: Cliente[]) => {
        this.aniversariantes = res;
      },
      error: (err) => {
        console.error('Erro ao carregar aniversariantes', err);
      }
    });
  }

  public selecionarMes(mes: number): void {
    this.mesSelecionado = mes;
    this.carregarAniversariantes(mes);
  }
}
