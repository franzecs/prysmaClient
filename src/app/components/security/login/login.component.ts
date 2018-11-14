import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@Angular/forms';

import { AuthService } from '../../../services';
import { CredenciaisDTO } from '../../../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
 
  creds : CredenciaisDTO = {
    email:"",
    senha:""
  }

  formulario: FormGroup = new FormGroup({
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    public auth: AuthService,
    private router: Router
    ) {}

  ngOnInit() {}

  login(){
    this.message = '';
    this.creds.email = this.formulario.value.email 
    this.creds.senha = this.formulario.value.senha

    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/']);
      },
      error =>{
        this.message = 'Erro ao conectar' + error.message;
      });
  }
}