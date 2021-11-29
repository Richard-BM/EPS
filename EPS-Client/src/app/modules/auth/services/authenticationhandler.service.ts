import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../api/api/authentication.service';

@Injectable()
export class AuthenticationHandlerService {

    private jwtHelper = new JwtHelperService();

    constructor(private apiAuthenticationService: AuthenticationService) { }

    authenticateWithUsername(username: string, password: string, remember: boolean): Observable<boolean> {

        return new Observable(observer => {

          this.apiAuthenticationService.authenticationClassicPost({
                email: username,
                password: password
            }).subscribe(response => {
                let result = false;

                if (response.success) {
                    this.cacheToken(response.token, remember);
                    result = true;
                }

                observer.next(result);
                observer.complete();

            }, error => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    logout() {
        sessionStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtToken");
    }

    hasValidToken(): boolean {

        let token = this.getCachedToken();

        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
        else {
            return false;
        }
    }

    getUserId(): string {

        let token = this.getCachedToken();

        if (token) {
         
            let decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.nameid;
        }
        else
            return "";
    }

    getUserDisplayName(): string {

        let token = this.getCachedToken();

        if (token) {
            let decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.given_name + " " + decodedToken.family_name;
        }
        else
            return "";
    }

    getCachedToken(): string {
        let token = localStorage.getItem("jwtToken");
        if (!token)
            token = sessionStorage.getItem("jwtToken");

        return token;
    }

    private cacheToken(token: string, remember: boolean) {
        if (remember)
            localStorage.setItem("jwtToken", token);
        else
            sessionStorage.setItem("jwtToken", token);
    }
}
