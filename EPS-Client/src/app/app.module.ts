import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import { ContentComponent } from './content/content.component';
import { ApiModule } from './api/api.module'
import { apiConfiguration } from '../environments/environment';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { PersonTableComponent } from './person-table/person-table.component';
import { LocationTableComponent } from './location-table/location-table.component';
import { ClientTableComponent } from './client-table/client-table.component';
import { ProjectTableComponent } from './project-table/project-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    AppointmentTableComponent,
    PersonTableComponent,
    LocationTableComponent,
    ClientTableComponent,
    ProjectTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    ApiModule.forRoot(apiConfiguration)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
