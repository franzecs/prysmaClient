import { Empresa, Endereco } from ".";

export class User{
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public password: string,
        public perfis: string[],
        public isAtivo: boolean,
        public endereco: Endereco,
        public empresa: Empresa,
        public url_perfil: string
    ){}
}