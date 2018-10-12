import { Component, OnInit,OnDestroy , ViewChild } from '@angular/core';
import { Usuario } from '../../../shared/models';
import { UserService } from '../../../shared/services';
import { OpcaoMenu, ItemMenu } from '../../../components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario
  menus:OpcaoMenu[]
  
  constructor(private userS: UserService) { }
  
  ngOnInit() { 
    this.userS.findUser().subscribe((resposta)=>{
      this.usuario = resposta
      this.changeMenu()
    })
  }

  changeMenu(){
    if(this.usuario.perfis.includes("ROOT_USER")){
      this.menuRoot()
    }
    if(this.usuario.perfis.includes("ADM_LOJA")){
      this.menuAdm()
    }
    if(this.usuario.perfis.includes("PDV_LOJA")){
      this.menuPdv()
    }
  }
  
  menuRoot(){
    this.menus = [
      new OpcaoMenu('Empresas','fa-address-card',[
        new ItemMenu('Empresas','root/empresas','fa-id-card'),
      ]),
      new OpcaoMenu('Usuarios','fa-product-hunt',[
        new ItemMenu('Usuarios','root/usuarios','fa-archive'),
      ]),
      new OpcaoMenu('Configirações','fa-usd',[
        new ItemMenu('Configurações','root/config','fa-archive'),
      ])
    ]
  }
  
  menuAdm(){
    this.menus = [
      new OpcaoMenu('Clientes','fa-address-card',[
        new ItemMenu('Cadastro de Clientes','cursos','fa-id-card'),
      ]),
      new OpcaoMenu('Estoque','fa-product-hunt',[
        new ItemMenu('Cadastro de Produtos','produtos','fa-archive'),
      ]),
      new OpcaoMenu('Financeiro','fa-usd',[
        new ItemMenu('Cadastro de Produtos','produtos','fa-archive'),
      ]),
      new OpcaoMenu('Pedidos','fa-shopping-cart',[
        new ItemMenu('Novo Pedidos','cursos','fa-cart-plus'),
        new ItemMenu('Pedidos Pendentes','faculdades','fa-cart-arrow-down'),
      ])
    ]
  }

  menuPdv(){
    this.menus = [
      new OpcaoMenu('Clientes','fa-address-card',[
        new ItemMenu('Cadastro de Clientes','cursos','fa-id-card'),
      ]),
      new OpcaoMenu('Pedidos','fa-shopping-cart',[
        new ItemMenu('Novo Pedidos','cursos','fa-cart-plus'),
        new ItemMenu('Pedidos Pendentes','faculdades','fa-cart-arrow-down'),
      ])
    ]
  }
}