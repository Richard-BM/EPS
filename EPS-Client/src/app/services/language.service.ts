import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(
        private translateService: TranslateService
    ) { }

    preLoadTranslations(): Observable<boolean> {

        return this.translateService.get("PRELOAD").pipe(
            map(res => res != "PRELOAD")
        );
    }
}