import { EmpresaDTO, Endereco, Cliente, Produto, Pedido } from ".";

export class Empresa {
    constructor(
        public id: string,
        public nome: string,
        public cnpj: string,
        public telefone: string,
        public email: string,
        public tipo: string,
        public matriz: EmpresaDTO,
        public endereco: Endereco,
        public url_logo?: string,
        public clientes?: Cliente[],
        public produtos?: Produto[],
        public pedidos?: Pedido[]
    ){ }
    
}