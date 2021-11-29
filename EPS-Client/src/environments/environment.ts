// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Configuration } from '../app/modules/api';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: false,
    msalConfiguration: {
        protectedResourceMap: [['https://localhost:5001/Authentication/azuread', ['api://e8e676a2-c89b-4c71-a938-ca9e2989ec95/api.consume']]] as [string, string[]][],
        consentScopes: [
            'user.read',
            'api://e8e676a2-c89b-4c71-a938-ca9e2989ec95/api.consume'
        ],
        clientId: "4f09e38e-45af-4eef-aefe-a829e4dacade",
        authority: 'https://login.microsoftonline.com/1b19ca81-aaaf-45d8-abf3-61e9f878271a',
        redirectUri: 'http://localhost:4200/login'
    },
    broadcastHubUrl: "https://localhost:5001/broadcasthub"
};

export function apiConfiguration() {
    return new Configuration({
        basePath: "https://localhost:5001",
    });
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
