import { Produto } from "./produto.model";

export class Item{
    constructor(
        public id: string,
        public produto: Produto,
        public quantidade: number,
        public vrTotal: number = produto.valor * quantidade
    ){}
}