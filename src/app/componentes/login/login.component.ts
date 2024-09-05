import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTToken } from 'src/app/model/JWTToken';
import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public usuario: Usuario = new Usuario;

  constructor(
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  autenticar(){
    this.loginService.logarUsuario(this.usuario).subscribe({
      next: (res: JWTToken) => {
        localStorage.setItem("EASTk", res.token);
        this.route.navigate(['/dashboard']);
      },
      error: () => {
        console.log("Deu ruim no login...");
        this.showToast('Falha ao realizar o login. Verifique suas credenciais.', 'bg-danger');
      }
    });
  }

  showToast(message: string, toastClass: string) {
    const toastElement = document.getElementById('loginToast');
    const toastMessageElement = document.getElementById('toastMessage');
    if (toastMessageElement) {
      toastMessageElement.innerText = message;
    }

    if (toastElement) {
      // Remove classes de fundo existentes e adiciona a nova classe
      toastElement.className = `toast align-items-center text-white border-0 ${toastClass}`;

      // Adiciona a classe de exibição do Bootstrap e remove após um tempo
      toastElement.classList.add('show');
      setTimeout(() => {
        toastElement.classList.remove('show');
      }, 3000); // Duração de exibição do toast em milissegundos
    }
  }
}
