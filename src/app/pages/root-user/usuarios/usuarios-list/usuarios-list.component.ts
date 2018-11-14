import { Component, OnInit, ViewChild } from '@angular/core';

import { ListPage } from '../../../../shared/abstract/list.component';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../shared/models/user.model';
import { ResponseApi } from '../../../../shared/models';
import { take } from 'rxjs/operators';
import { MsgType, ModalMessage } from 'src/app/components';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  @ViewChild(ModalMessage) modalMsg: ModalMessage
  page: number = 0;
  count: number = 2;
  pages: Array<number>;
  totalElements: number
  usuarios = [];
  
  constructor(
    private dialogService: DialogService,
    private usuariosService: UserService,
    ) { }

  ngOnInit() {
    this.getList(this.page, this.count)
  }
  
  getList(page: number, count: number) {
    this.usuariosService.findAll(page,count).pipe(take(1))
                          .subscribe((responseApi: ResponseApi) => {
                              this.usuarios = responseApi['data']['content'];
                              this.pages = new Array(responseApi['data']['totalPages'])
                              this.totalElements = responseApi['data']['totalElements']
                          })
  }

  delete(id: string) {
    this.dialogService.confirm('Você deseja deletar a empresa selecionada?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.usuariosService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.openModal(`Empresa deletada com sucesso!`, MsgType.SUCCESS)
            this.getList(this.page, this.count)
          }, err => {
            this.openModal(`Falha ao deletar!! (${err['error']['errors'][0]})`, MsgType.ERROR)
          })
        }
      })
  }

  resetPassword(email){
    
  }
  isAtivo(status, id){
    if(status != null){
      this.usuariosService.updateStatus(status , id).pipe(take(1)).subscribe(()=>{
        this.getList(this.page,this.count)
      }, err => {
        console.log('erro ao modificar status: ', err)
      });
      
    }
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
