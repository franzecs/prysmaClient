import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers:[ ]
})
export class TopoComponent implements OnInit {

  showMenu: boolean = false

  constructor(
    public auth: AuthService
    ) { }

  ngOnInit() {
  }

  public sair(){
    this.auth.logout()
  }

  controlNav(){
    if(this.showMenu === false){
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      this.showMenu = true
    }else{
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      this.showMenu = false
    }
  }
}
