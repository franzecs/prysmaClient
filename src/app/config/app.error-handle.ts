import { Injectable, ErrorHandler, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AplicationErrorHandle extends ErrorHandler{
    constructor(private injector: Injector){
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any){
        if (errorResponse instanceof HttpErrorResponse){
            const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error): errorResponse.error;

            if(errorResponse.status === 400 &&
                (error.error==='token_expired' || error.error==='token_invalid'||
                 error.error==='A token is required' || error.error==='token_not_provided')){
                this.goToLogin();
            }

            if(errorResponse.status === 401 && error.error === 'token_has_been_blacklisted'){
                this.goToLogin();
            }
        }
        super.handleError(errorResponse);
    }

    goToLogin(){
        const router = this.injector.get(Router);
        router.navigate(['/login']);
    }
}