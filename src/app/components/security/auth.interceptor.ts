import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { SharedService, StorageService } from "../../services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { API } from "src/app/config/api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();

        let N = API.length;
        let requestToAPI = req.url.substring(0, N) == API;

        if (localUser && requestToAPI) {
            if(req.url.includes('//viacep.com.br/ws/')){
                return next.handle(req)
            }else{
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
            }
        }
        else {
            return next.handle(req);
        }
    }
}
   
   
   /* shared: SharedService;
    constructor() {
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest: any;

        if (this.shared.isLoggedIn()) {
            if(req.url.includes('//viacep.com.br/ws/')){
                return next.handle(req)
            }else{
                authRequest = req.clone({
                    setHeaders: {
                        'Authorization':  'Bearer ' + localStorage.getItem('IdToken')//this.shared.token 
                    }
                });
                return next.handle(authRequest);
                
            }
        } else {
            return next.handle(req);
        }
    }
}
*/