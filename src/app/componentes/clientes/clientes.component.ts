import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/servicos/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public clientesFiltrados: Cliente[] = [];
  public alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  public keyword: string = '';
  public contador: number = 0;

  @ViewChild('alphabetBar', { static: true }) alphabetBar!: ElementRef;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.recuperarTodos().subscribe({
      next: (res: Cliente[]) => {
        this.clientes = res;
        this.route.queryParams.subscribe(params => {
          const letra = params['letra'] || '';
          const keyword = params['keyword'] || '';
          if (letra) {
            this.filtrarPorLetra(letra);
          } else if (keyword) {
            this.keyword = keyword;
            this.filtrarPorNome();
          } else {
            this.clientesFiltrados = this.clientes;
          }
        });
      },
      error: (err) => {
        console.log("ERRO AO RECUPERAR CLIENTES "+ err.message);
      }
    });
  }

  public filtrarPorLetra(letra: string) {
    if (letra) {
      this.router.navigate(['/clientes'], { queryParams: { letra: letra } });
    } else {
      this.router.navigate(['/clientes']);
    }
    this.clientesFiltrados = letra ? this.clientes.filter(cliente => cliente.nome.startsWith(letra)) : this.clientes;
  }

  public buscarCliente() {
    if (this.keyword) {
      this.router.navigate(['/clientes'], { queryParams: { keyword: this.keyword } });
      this.filtrarPorNome();
    } else {
      this.router.navigate(['/clientes']);
      this.clientesFiltrados = this.clientes;
    }
  }

  public filtrarPorNome() {
    this.clientesFiltrados = this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(this.keyword.toLowerCase()));
  }

  scrollLeft(): void {
    this.alphabetBar.nativeElement.scrollBy({ left: -50, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.alphabetBar.nativeElement.scrollBy({ left: 50, behavior: 'smooth' });
  }

  public isBrithday(dataNasc: string): boolean {
    if (!dataNasc) return false;

    // Extrai o mês e o dia da data de nascimento
    const [year, month, day] = dataNasc.split('-');
    const dataAniversario = { day: Number(day), month: Number(month) };

    // Obter a data atual
    const hoje = new Date();
    const hojeDia = hoje.getDate();
    const hojeMes = hoje.getMonth() + 1; // +1 porque getMonth() é baseado em zero

    // Comparar o dia e o mês
    const ehAniversario = dataAniversario.day === hojeDia && dataAniversario.month === hojeMes;

    return ehAniversario;
  }
}
