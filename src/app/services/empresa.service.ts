import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { API } from '../config/api';
import { Empresa } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http: HttpClient) { }

  createOrUpdate(empresa: Empresa){
    if(empresa.id !=null && empresa.id !=''){
      return this.http.put(`${API}/empresas`, empresa);
    }else{
      empresa.id = null;
      return this.http.post(`${API}/empresas`, empresa);
    }
  }

  findAll(){
    return this.http.get(`${API}/empresas`);
  }

  findAllPage(page: number, count: number){
    return this.http.get(`${API}/empresas/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${API}/empresas/${id}`); 
  }

  delete(id:string){
    return this.http.delete(`${API}/empresas/${id}`);
  }
}
