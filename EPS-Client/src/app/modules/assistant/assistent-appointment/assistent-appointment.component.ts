import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { EditServiceService } from '../../../services/editService.service';
import { AppointmentCreationRequest, AppointmentEditRequest, AppointmentService, LocationResponse, LocationService, PersonResponse, PersonService, ProjectResponse, ProjectService } from '../../api';
import { DisplayAppointment } from '../../dashboard/interfaces/DisplayAppointment.Interface';
import { DisplayProjects } from '../../dashboard/interfaces/DisplayProjects.Interface';

@Component({
  selector: 'app-assistent-appointment',
  templateUrl: './assistent-appointment.component.html',
  styleUrls: ['./assistent-appointment.component.css']
})
export class AssistentAppointmentComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public appointmentService: AppointmentService, private personService: PersonService, private locationService: LocationService
    , public projectService: ProjectService, private dataStoreService: DatastoreService, private editService: EditServiceService, private datePipe: DatePipe) { }

  @ViewChild('appointmentDetailForm') appointmentDetailForm: NgForm;

  public appointmentEdit: DisplayAppointment;
  public appointmentTimeFrom: Date;
  public appointmentTimeTo: Date;
  public persons: PersonResponse[] = [];
  public locations: LocationResponse[] = [];
  public projects: ProjectResponse[] = [];

  public selectedPerson: PersonResponse;
  public selectedProject: ProjectResponse;
  public selectedLocation: LocationResponse;


  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.appointmentEdit = this.editService.appointmentEdit;

    this.personService.personPersonsGet().subscribe(personResponse => {
      this.persons = personResponse;

      this.locationService.locationLocationsGet().subscribe(locationResponse => {
        this.locations = locationResponse;

        this.projectService.projectProjectsGet().subscribe(projectResponse => {
          this.projects = projectResponse;

          if (this.appointmentEdit.isNew) {
            this.appointmentEdit.workerName = "";
            this.appointmentEdit.locationName = "";
            this.appointmentEdit.street = "";
            this.appointmentEdit.postalcode = "";
            this.appointmentEdit.city = "";
            this.appointmentEdit.timeFrom = "";
            this.appointmentEdit.timeTo = "";
          } else if (this.appointmentEdit.changed) {
            const responseAppointment = this.dataStoreService.appointmentResponse.find(x => x.appointmentId == this.appointmentEdit.id);

            this.appointmentTimeFrom = new Date(Date.parse(responseAppointment.startDate.toString()));
            this.appointmentTimeTo = new Date(Date.parse(responseAppointment.endDate.toString()));

            this.selectedPerson = responseAppointment.personResponse;
            this.selectedProject = responseAppointment.projectResponse;
            this.selectedLocation = responseAppointment.locationResponse;
          }
        });
      });
    });
  }

  public onFinish() {
    if (this.appointmentEdit.changed) {
      let changedAppointment: AppointmentEditRequest = {
        assignedProjectId: this.selectedProject.projectId,
        assignedPersonId: this.selectedPerson.personId,
        assignedLocationId: this.selectedLocation.locationId,
        timeFrom: this.appointmentTimeFrom,
        timeTo: this.appointmentTimeTo
      }

      this.appointmentService.appointmentAppointmentIdPut(this.appointmentEdit.id, changedAppointment).subscribe(response => {
        this.dataStoreService.dataChanged(response);
        this.ref.close();
      });


    } else if (this.appointmentEdit.isNew) {
      let newAppointment: AppointmentCreationRequest = {
        assignedProjectId: this.selectedProject.projectId,
        assignedPersonId: this.selectedPerson.personId,
        assignedLocationId: this.selectedLocation.locationId,
        timeFrom: this.appointmentTimeFrom,
        timeTo: this.appointmentTimeTo
      }

      this.appointmentService.appointmentPost(newAppointment).subscribe(response => {
        this.dataStoreService.dataChanged(response);
        this.ref.close();
      });
    }
  }

  public onExit() {
    this.ref.close();
  }
}
