import { ViewChild } from "@angular/core";
import { ModalMessage, MsgType } from "../../components";

export abstract class ListPage<T> {

  @ViewChild(ModalMessage) modalMsg: ModalMessage
  objetos: T[]
  subscription: any;
  idObj: string

  tableObj: T[]
  pagina: number = 0;
  qtdPorPagina: number = 3;
  totalReg: number = 0

  constructor() { }

  page($event: any) {
    this.pagina = $event - 1;
    this.fillTable();
  }

  fillTable() {
    this.tableObj = [];
    for (let i = (this.pagina * this.qtdPorPagina); i < (this.pagina * this.qtdPorPagina + this.qtdPorPagina); i++) {
      if (i >= this.objetos.length) {
        break;
      }
      this.tableObj.push(this.objetos[i]);
    }
  }

  openModal(idOBJ, sigla, objeto) {
    this.idObj = idOBJ
    this.modalMsg.showMessage(`Deseja realmente exluir ${objeto}: ` + sigla, MsgType.DELETE)
  }
}