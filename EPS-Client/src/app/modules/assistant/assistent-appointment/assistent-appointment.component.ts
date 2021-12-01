import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { AppointmentCreationRequest, AppointmentService, LocationResponse, LocationService, PersonResponse, PersonService, ProjectResponse, ProjectService } from '../../api';
import { DisplayAppointment } from '../../dashboard/interfaces/DisplayAppointment.Interface';
import { DisplayProjects } from '../../dashboard/interfaces/DisplayProjects.Interface';

@Component({
  selector: 'app-assistent-appointment',
  templateUrl: './assistent-appointment.component.html',
  styleUrls: ['./assistent-appointment.component.css']
})
export class AssistentAppointmentComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public appointmentService: AppointmentService, private personService: PersonService, private locationService: LocationService
    , public projectService: ProjectService, private dataStoreService: DatastoreService) { }

  @ViewChild('appointmentDetailForm') appointmentDetailForm: NgForm;

  public appointmentEdit: DisplayAppointment;
  public persons: PersonResponse[] = [];
  public locations: LocationResponse[] = [];
  public projects: ProjectResponse[] = [];

  public selectedPerson: PersonResponse;
  public selectedProject: ProjectResponse;
  public selectedLocation: LocationResponse;


  ngOnInit(): void {
    this.appointmentEdit = {
      id: null,
      city: "",
      locationName: "",
      postalcode: "",
      timeTo: "",
      timeFrom: "",
      street: "",
      workerName:""
    }

    this.personService.personPersonsGet().subscribe(personResponse => {
      this.persons = personResponse;

      this.locationService.locationLocationsGet().subscribe(locationResponse => {
        this.locations = locationResponse;

        this.projectService.projectProjectsGet().subscribe(projectResponse => {
          this.projects = projectResponse;
        });
      });
    });
  }

  public onFinish() {
    let newAppointment: AppointmentCreationRequest = {
      assignedProjectId: this.selectedProject.projectId,
      assignedPersonId: this.selectedPerson.personId,
      assignedLocationId: this.selectedLocation.locationId,
      timeFrom: new Date(this.appointmentEdit.timeFrom),
      timeTo: new Date(this.appointmentEdit.timeTo)
    }

    this.appointmentService.appointmentAppointmentsPost(newAppointment).subscribe(response => {
      this.dataStoreService.dataChanged(response);
      this.ref.close();
    });
  }

  public onExit() {
    this.ref.close();
  }
}
