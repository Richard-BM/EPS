
import { Configuration } from '../app/modules/api';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: true,
};

export function apiConfiguration() {
    return new Configuration({
      basePath: "https://eps.richard-software.de:80",
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
