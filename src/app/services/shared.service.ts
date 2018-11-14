import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  user: User;
  userTemp = new User('','','','',[''],true,null,null,'');
  token: string;
  showTemplate = new EventEmitter<boolean>();
  message = {}
  classCss = {}

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean{
    if(this.user == null){
      return false;
    }
    return this.user.email !='';
  }

  showMessage(message:{type: string, text: string}): void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() =>{
      this.message = undefined
    }, 3000);
  }

  buildClasses(type:string): void{
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }
}
