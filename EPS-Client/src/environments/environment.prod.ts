
import { Configuration } from '../app/modules/api';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: true,
};

export function apiConfiguration() {
    return new Configuration({
        basePath: "https://localhost:5001",
    });
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
