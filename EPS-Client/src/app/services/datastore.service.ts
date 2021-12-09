import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppointmentResponse, ClientResponse, LocationResponse, PersonResponse, ProjectResponse } from '../modules/api';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  public appointmentResponse: AppointmentResponse[] = [];

  public dataChange = new Subject<any>();

  public dataChanged(changedData: any) {
    this.dataChange.next(changedData);
  }
}
