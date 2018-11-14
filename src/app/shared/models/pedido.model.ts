import { Cliente } from "./cliente.model";
import { Olho } from "./olho.model";
import { Item } from "./item.model";

export class Pedido{

    vrTotalPedido: number

    constructor(
        public id: string,
        public data: Date,
        public cliente: Cliente,
        public usuario: Cliente,
        public olhoDireito: Olho,
        public olhoEsquerdo: Olho,
        public formaPagamento: string[],
        public condicaoPagamento: string,
        public documentos: string[],
        public itens: Item[],
        public observacao?: string
    ){}

    totalPedido(): number{
        for(let i of this.itens){
            this.vrTotalPedido += i.vrTotal
        }
        return this.vrTotalPedido
    }
}