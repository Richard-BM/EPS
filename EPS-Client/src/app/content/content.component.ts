import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { AppointmentResponse, AppointmentService, ClientResponse, ClientService, LocationResponse, LocationService, PersonResponse, PersonService, ProjectResponse, ProjectService } from '../api';
import { displayAppointment } from '../interfaces/displayAppointment.interface';
import { displayClient } from '../interfaces/displayClient.interface';
import { displayLocation } from '../interfaces/displayLocation.interface';
import { displayPerson } from '../interfaces/displayPerson.interface';
import { displayProject } from '../interfaces/displayProject.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  private appointmentResponse: AppointmentResponse[] = [];
  private personResponse: PersonResponse[] = [];
  private locationResponse: LocationResponse[] = [];
  private projectResponse: ProjectResponse[] = [];
  private clientResponse: ClientResponse[] = [];

  public displayAppointment: displayAppointment[] = [];
  public displayPerson: displayPerson[] = [];
  public displayLocation: displayLocation[] = [];
  public displayProject: displayProject[] = [];
  public displayClient: displayClient[] = [];

  public dataLoaded: boolean = false;

  constructor(private appointmentService: AppointmentService,
    private personService: PersonService, private LocationService: LocationService
    , private projectService: ProjectService, private clientService: ClientService) { }


  ngOnInit(): void {
    this.loadDataSource();
  }

  private loadDataSource() {
    this.appointmentService.appointmentAppointmentsGet().subscribe(response => {
      this.appointmentResponse = response;

      this.personService.personPersonsGet().subscribe(presponse => {
        this.personResponse = presponse;

        this.LocationService.locationLocationsGet().subscribe(lresponse => {
          this.locationResponse = lresponse;

          this.projectService.projectProjectsGet().subscribe(proResponse => {
            this.projectResponse = proResponse;

            this.clientService.clientClientsGet().subscribe(cliResponse => {
              this.clientResponse = cliResponse;

              this.createDisplayAppointments(response);
              this.createDisplayPersons(presponse);
              this.createDisplayLocation(lresponse);
              this.createDisplayClient(cliResponse);
              this.createDisplayProject(proResponse);

              this.dataLoaded = true;
            });
          });
        });
      });
    });
  }

  private createDisplayAppointments(appointments: AppointmentResponse[]) {
    for (let currentAppointment of appointments) {
      let displayAppointment: displayAppointment = {
        id: currentAppointment.appointmentId,
        personName: currentAppointment.personResponse.firstname + ", " + currentAppointment.personResponse.lastname,
        locationName: currentAppointment.locationResponse.name,
        projectName: currentAppointment.projectResponse.projectName,
        startDate: currentAppointment.startDate,
        endDate: currentAppointment.endDate
      }

      this.displayAppointment.push(displayAppointment);
    }
  }

  private createDisplayPersons(persons: PersonResponse[]) {
    for (let currentPerson of persons) {
      let displayPerson: displayPerson = {
        id: currentPerson.personId,
        firstname: currentPerson.firstname,
        lastname: currentPerson.lastname,
        email: currentPerson.eMail,
        dateOfBirth: currentPerson.dateOfBirth
      }

      this.displayPerson.push(displayPerson);
    }
  }

  private createDisplayLocation(locations: LocationResponse[]) {
    for (let currentLocation of locations) {
      let displayLocation: displayLocation = {
        id: currentLocation.locationId,
        name: currentLocation.name,
        street: currentLocation.street,
        postalCode: currentLocation.postalcode,
        city: currentLocation.city,
      }

      this.displayLocation.push(displayLocation);
    }
  }

  private createDisplayClient(clients: ClientResponse[]) {
    for (let currentClient of clients) {
      let displayClient: displayClient = {
        id: currentClient.clientId,
        name: currentClient.name
      }

      this.displayClient.push(displayClient);
    }
  }

  private createDisplayProject(projects: ProjectResponse[]) {
    for (let currentProject of projects) {
      let displayProject: displayProject = {
        id: currentProject.projectId,
        name: currentProject.projectName,
        number: currentProject.projectNumber,
        description: currentProject.projectDescription
      }

      this.displayProject.push(displayProject);
    }
  }
}
