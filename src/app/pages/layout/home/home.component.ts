import { Component, OnInit,OnDestroy , ViewChild } from '@angular/core';
import { OpcaoMenu, ItemMenu } from '../../../components';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../services/user.service';
import { SharedService, AuthService, StorageService } from '../../../services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menus:OpcaoMenu[]
  
  constructor(
      public storageService: StorageService,
      public authService : AuthService,
      private router: Router,
    ) {     }
  
  ngOnInit() { 
    this.changeMenu();
    this.authService.refreshToken().subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
    }, err => this.authService.logout())
  }

  changeMenu(){

    this.authService.currentUser(this.storageService.getLocalUser().email).subscribe((resposta: any)=>{
      let perfis = resposta.data.perfis;

      if(perfis.includes("ADMIN_SISTEMA")){
        this.menuRoot()
      }
      if(perfis.includes("ADM_LOJA")){
        this.menuAdm()
      }
      if(perfis.includes("VENDEDOR")){
        this.menuPdv()
      }

    })
  }
  
  menuRoot(){
    this.menus = [
      new OpcaoMenu('Empresas','fa-address-card',[
        new ItemMenu('Empresas','/root/empresas','fa-id-card'),
      ]),
      new OpcaoMenu('Usuarios','fa-product-hunt',[
        new ItemMenu('Usuarios','/root/usuarios','fa-archive'),
      ]),
      new OpcaoMenu('Configirações','fa-usd',[
        new ItemMenu('Configurações','/root/config','fa-archive'),
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