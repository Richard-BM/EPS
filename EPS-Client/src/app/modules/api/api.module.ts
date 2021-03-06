import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AppointmentService } from './api/appointment.service';
import { AuthenticationService } from './api/authentication.service';
import { ClientService } from './api/client.service';
import { LocationService } from './api/location.service';
import { PersonService } from './api/person.service';
import { ProjectService } from './api/project.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AppointmentService,
    AuthenticationService,
    ClientService,
    LocationService,
    PersonService,
    ProjectService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
