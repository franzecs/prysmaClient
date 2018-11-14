import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

import { API } from "../config/api";
import { CredenciaisDTO, LocalUser } from "../shared/models";
import { StorageService } from "./storage.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        private router: Router,
        public storage: StorageService,
    ) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${API}/login`, creds, {
            observe: 'response',
            responseType: 'text'
        });
    }
    
    refreshToken() {
        return this.http.post(`${API}/auth/refresh_token`, {}, {
                observe: 'response',
                responseType: 'text'
            });
    }

    currentUser(email: String) {
        return this.http.get(`${API}/users/currentuser/${email}`)
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        const decodedToken = this.jwtHelper.decodeToken(tok).sub;
        let user: LocalUser = {
            token: tok,
            email: decodedToken
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
        this.router.navigate(['/login']);
    }
}