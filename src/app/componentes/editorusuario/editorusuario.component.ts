import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-editorusuario',
  templateUrl: './editorusuario.component.html',
  styleUrls: ['./editorusuario.component.css']
})
export class EditorusuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  public mode: 'create' | 'edit' = 'create';
  public usuarioId: number | null = null;
  public senhaMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ativo: [1],
      senha: ['', Validators.required],
      confirmSenha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.mode = 'edit';
        this.usuarioId = parseInt(id, 10);
        this.carregarUsuario(this.usuarioId);
      } else {
        this.mode = 'create';
      }
    });
  }

  private carregarUsuario(id: number): void {
    this.usuarioService.recuperarUsuarioPeloId(id).subscribe({
      next: (usuario: Usuario) => {
        this.usuarioForm.patchValue(usuario);
      },
      error: (err) => {
        console.error('Erro ao carregar usuário', err);
      }
    });
  }

  public saveUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const senha = this.usuarioForm.value.senha;
    const confirmSenha = this.usuarioForm.value.confirmSenha;

    if (senha !== confirmSenha) {
      this.senhaMismatch = true;
      return;
    }
    this.senhaMismatch = false;

    const usuario: Usuario = this.usuarioForm.value;

    if (this.mode === 'create') {
      this.usuarioService.criarUsuario(usuario).subscribe({
        next: () => this.router.navigate(['/usuarios']),
        error: (err) => console.error('Erro ao criar usuário', err)
      });
    } else {
      this.usuarioService.atualizarUsuario(usuario).subscribe({
        next: () => this.router.navigate(['/usuarios']),
        error: (err) => console.error('Erro ao atualizar usuário', err)
      });
    }
  }

  public checkPasswordMatch(): void {
    const senha = this.usuarioForm.get('senha')?.value;
    const confirmSenha = this.usuarioForm.get('confirmSenha')?.value;
    this.senhaMismatch = senha !== confirmSenha;
  }

  public sugereUsername() {
    const email = this.usuarioForm.get('email')?.value || '';
    const usernameControl = this.usuarioForm.get('username');

    if (usernameControl?.pristine && usernameControl?.untouched) {
      const suggestedUsername = email.split('@')[0];
      usernameControl?.setValue(suggestedUsername);
    }
  }
}
