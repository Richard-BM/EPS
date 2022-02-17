import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent, private translateService: TranslateService,
        private languageService: LanguageService) { }

    ngOnInit() {

        this.languageService.preLoadTranslations().subscribe(res => {

            this.model = [
                {
                    label: this.translateService.instant("APPMODULE.MENUITEMS.DASHBOARD"), icon: 'pi pi-fw pi-home', routerLink: ['/']
                },
                {
                  label: this.translateService.instant("APPMODULE.MENUITEMS.PERSONS"), icon: 'pi pi-fw pi-users', routerLink: ['/staff']
                },
                {
                  label: this.translateService.instant("APPMODULE.MENUITEMS.CLIENTS"), icon: 'pi pi-fw pi-clone', routerLink: ['/clients']
                },
                {
                  label: this.translateService.instant("APPMODULE.MENUITEMS.LOCATIONS"), icon: 'pi pi-fw pi-map-marker', routerLink: ['/locations']
                },
                {
                  label: this.translateService.instant("APPMODULE.MENUITEMS.APPOINTMENTS"), icon: 'pi pi-fw pi-calendar', routerLink: ['/appointments']
                }
            ];
        });
    }

    onMenuClick() {
        this.app.menuClick = true;
    }
}
