import { Component, OnInit, ViewChild, AfterViewInit, AfterContentChecked, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationHandlerService } from '../../services/authenticationhandler.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TabView, TabPanel } from 'primeng/tabview';

@Component({
    selector: 'auth-login',
    templateUrl: './auth.login.component.html',
    styleUrls: ['./auth.login.component.css']
})
export class LoginComponent implements AfterViewInit {

    @ViewChild("loginTabView")
    private loginTabView: TabView;

    showClassicLoginError = false;
    showAzureADLoginError = false;

    classicLoginFormModel: {
        username: string,
        password: string,
        remember: boolean
    } = {
            username: null,
            password: null,
            remember: false
        };

    azureADLoginFormModel: {
        remember: boolean
    } = {
            remember: false
        };

    constructor(private router: Router,
        private authenticationHandlerService: AuthenticationHandlerService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loginTabView.cd.markForCheck();
        }, 100);
    }

    onClassicLogin() {

        if (this.classicLoginFormModel.username && this.classicLoginFormModel.password) {

            this.authenticationHandlerService.authenticateWithUsername(this.classicLoginFormModel.username
                , this.classicLoginFormModel.password, this.classicLoginFormModel.remember).subscribe(result => {

                    this.showClassicLoginError = !result;

                    if (result)
                        this.router.navigate(["/"]);
                });;
        }
    }
}
