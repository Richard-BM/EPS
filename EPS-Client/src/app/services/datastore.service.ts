import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppointmentResponse, ClientResponse, LocationResponse, PersonResponse, ProjectResponse } from '../modules/api';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  public dataChange = new Subject<any>();

  public clients: ClientResponse[] = [];
  public projects: ProjectResponse[] = [];
  public appointments: AppointmentResponse[] = [];
  public locations: LocationResponse[] = [];
  public persons: PersonResponse[] = [];

  public dataChanged(changedData: any) {
    this.dataChange.next(changedData);
  }
}
