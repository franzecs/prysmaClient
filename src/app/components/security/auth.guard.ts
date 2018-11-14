import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedService, StorageService } from "../../services";
import { API } from "src/app/config/api";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        public storage: StorageService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | boolean {

        let localUser = this.storage.getLocalUser();

        if (localUser) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
}