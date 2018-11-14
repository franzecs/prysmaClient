import { Empresa } from "../empresa.model";

export class UserDTO {
    constructor(
        public id: string,
        public nome: string,
        public empresa: Empresa
    ){
    } 
}