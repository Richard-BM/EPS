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
                }
            ];
        });
    }

    onMenuClick() {
        this.app.menuClick = true;
    }
}
