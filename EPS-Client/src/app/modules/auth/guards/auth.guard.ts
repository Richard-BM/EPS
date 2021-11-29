import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationHandlerService } from '../services/authenticationhandler.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationHandlerService: AuthenticationHandlerService) {
    }

    canActivate(): boolean {

        if (this.authenticationHandlerService.hasValidToken()) {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
