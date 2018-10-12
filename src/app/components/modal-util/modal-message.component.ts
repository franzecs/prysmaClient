import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modal-message',
    templateUrl: './modal-message.component.html',
    styleUrls: ['modal-message.component.css']
})
export class ModalMessage {

    private Message: string;
    public MessageIsVisible: boolean;
    public type: string

    @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

    showMessage(msg: string, type: string){
        this.Message = msg;
        this.type = type;
        this.MessageIsVisible = true;
    }

    hideMsg(){
        this.MessageIsVisible = false;
    }

    Confirmar() {
        this.onConfirm.emit(true);
        this.hideMsg();
	}
}

export enum MsgType{
    DELETE= "delete",
    SUCCESS="sucesso",
    ERROR="error"
}