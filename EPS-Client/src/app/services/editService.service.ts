import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { DisplayAppointment } from '../modules/dashboard/interfaces/DisplayAppointment.Interface';
import { DisplayClient } from '../modules/dashboard/interfaces/displayClient.Interface';
import { DisplayLocation } from '../modules/dashboard/interfaces/DisplayLocation.Interface';
import { DisplayPerson } from '../modules/dashboard/interfaces/DisplayPerson.Interface';
import { DisplayProjects } from '../modules/dashboard/interfaces/DisplayProjects.Interface';

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  clientEdit: DisplayClient;
  projectEdit: DisplayProjects;
  appointmentEdit: DisplayAppointment;
  locationEdit: DisplayLocation;
  personEdit: DisplayPerson;

  constructor() { }

  setClientData(clientEdit: DisplayClient) {
    if (clientEdit)
      this.clientEdit = { ...clientEdit };
    else {
      this.clientEdit = {
        id: Guid.create().toString(),
        changed: false,
        isNew: true,     
      }
    }
  }

  setProjectData(projectEdit: DisplayProjects) {
    if (projectEdit)
      this.projectEdit = { ...projectEdit };
    else {
      this.projectEdit = {
        id: Guid.create().toString(),
        changed: false,
        isNew: true,
      }
    }
  }

  setAppointmentData(appointmentEdit: DisplayAppointment) {
    if (appointmentEdit)
      this.appointmentEdit = { ...appointmentEdit };
    else {
      this.appointmentEdit = {
        id: Guid.create().toString(),
        changed: false,
        isNew: true,
      }
    }
  }

  setLocationData(locationEdit: DisplayLocation) {
    if (locationEdit)
      this.locationEdit = { ...locationEdit };
    else {
      this.locationEdit = {
        id: Guid.create().toString(),
        changed: false,
        isNew: true,
      }
    }
  }

  setPersonData(personEdit: DisplayPerson) {
    if (personEdit)
      this.personEdit = { ...personEdit };
    else {
      this.personEdit = {
        id: Guid.create().toString(),
        changed: false,
        isNew: true,
      }
    }
  }
}
