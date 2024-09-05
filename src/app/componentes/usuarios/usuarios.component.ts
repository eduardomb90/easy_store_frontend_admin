import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.recuperarTodods().subscribe({
      next: (res: Usuario[]) => {
        this.usuarios = res;
      },
      error: (err) => {

      }
    });
  }

  ngOnInit(): void {
  }

  public ativaUsuario(usuario: Usuario) {
    console.log("Ativando " + usuario.id + " status: "+ usuario.ativo);
    usuario.ativo = (usuario.ativo)? 1:0;
    this.usuarioService.atualizarUsuario(usuario).subscribe({
      next: (res: Usuario) => {
        console.log(res);
      },
      error: (err) => {
        console.log("Erro "+ err);
      }
    });
  }

}
