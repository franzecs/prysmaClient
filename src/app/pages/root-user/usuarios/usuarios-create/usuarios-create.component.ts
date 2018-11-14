import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@Angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { empty } from 'rxjs';

import { Cidade, Empresa, Endereco, EstadoBr, Listas, User, ResponseApi } from '../../../../shared/models'
import { CheckboxItem, ModalMessage, MsgType } from '../../../../components'
import { UserService, EmpresaService, ConsultaCepService, SharedService } from '../../../../services';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent implements OnInit {

  @ViewChild(ModalMessage) modalMsg: ModalMessage
  formulario: FormGroup;
  user: User;
  perfis: string[]
  userPerfis = new Array<CheckboxItem>();
  id: string;
  endereco: Endereco
  empresas: Empresa[]
  estados: EstadoBr[];
  cidades: Cidade[];
  shared: SharedService;
  
  /*
  empresa: Empresa = new Empresa('teerer', 'Empresa Teste', '667789898989', null,'','teste@teste.com','MATRIZ',null);  
    pathUpload = "/users"
    
  */

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UserService,
    private empresaService: EmpresaService,
    private cepService: ConsultaCepService,
    private route: ActivatedRoute,
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      if (parametros['id'] === '0') {
        this.newRecord();
      } else {
        this.id = parametros['id']
        this.findById(this.id)
      }
    })
  }

  findById(id: string) {
   this.usuariosService.findById(id).pipe(take(1)).subscribe((responseApi: ResponseApi) => {
      this.user = responseApi.data;
      this.cepService.getCidadeNome(this.user.endereco.cidade).subscribe(dados => this.cidades = dados)
        this.userPerfis = Listas._perfil.map(x => {
          if (this.user.perfis.includes(x.perfil)) {
            return new CheckboxItem(x.perfil, x.perfil, true)
          } else {
            return new CheckboxItem(x.perfil, x.perfil, false)
          }
        })

        this.onRolesChange(this.user.perfis)

        this.listFactory()

        this.formulario = this.formBuilder.group({
          id: [this.user.id],
          nome: [this.user.nome, [Validators.required, Validators.minLength(3)]],
          email: [this.user.email, [Validators.required, Validators.email]],
          password:[ this.user.password, [Validators.required, Validators.minLength(6)]],
          endereco: this.formBuilder.group({
            cep: [this.user.endereco.cep, [Validators.required]],
            numero: [this.user.endereco.numero, Validators.required],
            complemento: [this.user.endereco.complemento],
            logradouro: [this.user.endereco.logradouro, Validators.required],
            bairro: [this.user.endereco.bairro, Validators.required],
            estado: [this.user.endereco.estado, Validators.required],
            cidade: [this.user.endereco.cidade, Validators.required],
          }),
          empresa: [this.user.empresa],
        })
        this.chageCitys()
        this.id = this.formulario.value.id
    }, err => {
      this.openModal(`Falha ao listar!! (${err['error']['errors'][0]})`, MsgType.ERROR) 
    })
  }

  newRecord() {
    this.listFactory()
    this.userPerfis = Listas._perfil.map(x => new CheckboxItem(x.perfil, x.perfil));

    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: ['12345678'],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null],
        complemento: [null],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      empresa: [null],
    })
    this.chageCitys()
  }

  onSubmite() {
    if (this.formulario.value.id === null) {
      this.user = new User(
        null,
        this.formulario.value.nome,
        this.formulario.value.email,
        this.formulario.value.password,
        this.perfis,
        true,
        this.formulario.value.endereco,
        this.formulario.value.empresa,
        ""
      )
      this.save(this.user)
    } else {
      this.user = this.formulario.value
      this.update(this.user)
    }
  }

  save(user: User): void {
    this.usuariosService.createOrUpdate(user).pipe(take(1))
    .subscribe((responseApi: ResponseApi)=>{
      this.user = this.shared.userTemp;
      let userRet: User = responseApi.data;
      this.openModal("Cadastro realizado com sucesso!!", MsgType.SUCCESS)
      this.resetForm()
    }, err =>{
      this.openModal(`Falha ao realizar cadastro!! (${err['error']['errors'][0]})`, MsgType.ERROR) 
    })
  }

  update(user: User){
    this.usuariosService.createOrUpdate(user).pipe(take(1)).subscribe(()=>{
      this.openModal("Dados editados com sucesso!!", MsgType.SUCCESS)
    }, err =>{
      this.openModal(`Falha ao editar!!(${err['error']['errors'][0]})`, MsgType.ERROR)
    })
  }

  /*receiveUrl(evento){
   this.usuariosService.update(PATH_USUARIO, this.id, {url_perfil:evento})
  }*/

  listFactory() {
    this.empresaService.findAll().pipe(take(1)).subscribe((responseApi: ResponseApi) => {
                              this.empresas = responseApi['data'];
                          })
    this.cepService.getEstadosBr().pipe(take(1)).subscribe(dados => this.estados = dados);
  }

  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type)
  }

  onRolesChange(value) {
    this.perfis = value
  }

  resetForm() {
    this.formulario.reset()
    this.userPerfis = Listas._perfil.map(x => new CheckboxItem(x.perfil, x.perfil));
  }

  chageCitys() {
    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.cepService.getCidades(estadoId)),
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).pipe(take(1)).subscribe((endereco: Endereco) => {
        this.populaDadosForm(endereco)
      })
    }
  }

  populaDadosForm(endereco) {
    this.formulario.patchValue({
      endereco: {
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        estado: endereco.uf
      }
    });
  }

  testEmpresa(emp1: Empresa, emp2: Empresa) {
    return emp1 && emp2 ? (emp1.nome === emp2.nome && emp1.id === emp2.id) : emp1 === emp2
  }
}