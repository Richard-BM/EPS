import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AppointmentQuestionnaireResultsService } from './api/appointmentQuestionnaireResults.service';
import { AppointmentsService } from './api/appointments.service';
import { AuthenticationService } from './api/authentication.service';
import { ClientsService } from './api/clients.service';
import { DataLockedService } from './api/dataLocked.service';
import { DisplayTypesService } from './api/displayTypes.service';
import { LocationService } from './api/location.service';
import { OrganisationalUnitsService } from './api/organisationalUnits.service';
import { PositionGroupsService } from './api/positionGroups.service';
import { ProjectTemplatesService } from './api/projectTemplates.service';
import { ProjectsService } from './api/projects.service';
import { ReportLinkTypesService } from './api/reportLinkTypes.service';
import { SettingsService } from './api/settings.service';
import { StatusService } from './api/status.service';
import { WeatherForecastService } from './api/weatherForecast.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AppointmentQuestionnaireResultsService,
    AppointmentsService,
    AuthenticationService,
    ClientsService,
    DataLockedService,
    DisplayTypesService,
    LocationService,
    OrganisationalUnitsService,
    PositionGroupsService,
    ProjectTemplatesService,
    ProjectsService,
    ReportLinkTypesService,
    SettingsService,
    StatusService,
    WeatherForecastService ]
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
