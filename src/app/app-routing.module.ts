import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { EditorcategoriaComponent } from './componentes/editorcategoria/editorcategoria.component';
import { EditorprodutosComponent } from './componentes/editorprodutos/editorprodutos.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { RelatoriosComponent } from './componentes/relatorios/relatorios.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EditorusuarioComponent } from './componentes/editorusuario/editorusuario.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'editorcategoria/:id', component: EditorcategoriaComponent},
  {path: 'editorproduto/:id', component: EditorprodutosComponent},
  {path: 'editorusuario/:id', component: EditorusuarioComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'relatorios', component: RelatoriosComponent},
  {path: 'usuarios', component: UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
