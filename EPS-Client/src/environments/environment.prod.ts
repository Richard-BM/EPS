
import { Configuration } from '../app/modules/api';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: true,
    msalConfiguration: {
        protectedResourceMap: [['https://localhost:5001/Authentication/azuread', ['api://98cc5a38-0f21-475c-b566-9561b0c29609/api.consume']]] as [string, string[]][],
        consentScopes: [
            'user.read',
            'api://98cc5a38-0f21-475c-b566-9561b0c29609/api.consume'
        ],
        clientId: "68d24c3d-045f-46b3-a499-a64e04097ab8",
        authority: 'https://login.microsoftonline.com/e6cec2cb-50a7-4fc9-8e0e-3cda9322f035',
        redirectUri: 'https://inhouse.agencypulse.de/login'
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