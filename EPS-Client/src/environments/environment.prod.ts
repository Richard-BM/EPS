
import { Configuration } from '../app/modules/api';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: true,
};

export function apiConfiguration() {
    return new Configuration({
      basePath: "https://192.168.178.5:8080",
    });
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
