import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';

import { Empresa, EstadoBr, Cidade, Endereco } from 'src/app/shared/models';
import { ModalMessage, MsgType } from 'src/app/components';
import { EmpresaService, ConsultaCepService } from 'src/app/services';
import { empty } from 'rxjs';

@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styleUrls: ['./empresas-create.component.css']
})
export class EmpresasCreateComponent implements OnInit {

  @ViewChild(ModalMessage) modalMsg: ModalMessage
  public formulario: FormGroup
  private empresa: Empresa
  estados: EstadoBr[];
  cidades: Cidade[];
  
  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private cepService: ConsultaCepService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cnpj: [null, [Validators.required, Validators.minLength(11)]],
      telefone: [null, [, Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      tipo:["Matriz", [Validators.required]],
      matriz: [null],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null],
        complemento: [null],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      url_logo: [""],
    })
    this.listFactory()
    this.chageCitys()
    
  }

  onSubmite(){
    this.empresa = this.formulario.value
    this.save(this.empresa)
  }

  save(empresa: Empresa):void{
     /*this.empresasService.createOrUpdate(empresa)
    .then(()=>{this.openModal("Cadastrado realizado com sucesso!!", MsgType.SUCCESS)})
    .catch((error: Error)=>{this.openModal(`Falha ao realizar o cadastro!! (${error.message})`, MsgType.ERROR)})
    */
  }

  openModal(msg, type) {
    this.modalMsg.showMessage(msg, type)
  }

   resetForm() {
    this.formulario.reset()
  }

  listFactory() {
    this.cepService.getEstadosBr().pipe(take(1)).subscribe(dados => this.estados = dados);
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
}
