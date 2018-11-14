import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/services';
import { take } from 'rxjs/operators';
import { ResponseApi } from 'src/app/shared/models';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { ModalMessage, MsgType } from 'src/app/components';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {
  @ViewChild(ModalMessage) modalMsg: ModalMessage
  page: number = 0;
  count: number = 2;
  pages: Array<number>;
  totalElements: number;
  empresas = [];

  constructor(
    private dialogService: DialogService,
    private empresaService: EmpresaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList(this.page, this.count)
  }

  getList(page: number, count: number) {
    this.empresaService.findAllPage(page, count).pipe(take(1))
      .subscribe((responseApi: ResponseApi) => {
        this.empresas = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages'])
        this.totalElements = responseApi['data']['totalElements']
      }, err => {
        this.openModal(`Falha ao listar!! (${err['error']['errors'][0]})`, MsgType.ERROR)
      })
  }

  delete(id: string) {
    this.dialogService.confirm('Você deseja deletar a empresa selecionada?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.empresaService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.openModal(`Empresa deletada com sucesso!`, MsgType.SUCCESS)
            this.getList(this.page, this.count)
          }, err => {
            this.openModal(`Falha ao deletar!! (${err['error']['errors'][0]})`, MsgType.ERROR)
          })
        }
      })
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.getList(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.getList(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getList(this.page, this.count);
  }


  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type)
  }
}