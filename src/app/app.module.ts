import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { EditorcategoriaComponent } from './componentes/editorcategoria/editorcategoria.component';
import { EditorprodutosComponent } from './componentes/editorprodutos/editorprodutos.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { RelatoriosComponent } from './componentes/relatorios/relatorios.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { IsBirthdayPipe } from './pipes/is-birthday.pipe';
import { EditorusuarioComponent } from './componentes/editorusuario/editorusuario.component';
import { GraficovendasComponent } from './componentes/graficovendas/graficovendas.component';
import { UltimospedidosComponent } from './componentes/ultimospedidos/ultimospedidos.component';
import { AniversariantesComponent } from './componentes/aniversariantes/aniversariantes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CategoriasComponent,
    EditorcategoriaComponent,
    EditorprodutosComponent,
    ProdutosComponent,
    PedidosComponent,
    ClientesComponent,
    RelatoriosComponent,
    UsuariosComponent,
    IsBirthdayPipe,
    EditorusuarioComponent,
    GraficovendasComponent,
    UltimospedidosComponent,
    AniversariantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
