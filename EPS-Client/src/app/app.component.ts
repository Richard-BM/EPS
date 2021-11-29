import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    horizontalMenu: boolean;

    darkMode = false;

    menuColorMode = 'light';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';

    ripple = true;

    inputStyle = 'outlined';

    constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) {

        this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
