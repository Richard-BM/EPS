import { Component, OnInit } from '@angular/core';
import { AppointmentService, ClientService, LocationService, PersonService } from '../../../api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private clientService: ClientService, private appointmentService: AppointmentService
    , private personalService: PersonService, private locationService: LocationService) { }

  public clientCount = 0;
  public projectCount = 0;
  public staffCount = 0;
  public appointmentCount = 0;
  public locationCount = 0;


  ngOnInit(): void {

    this.clientService.clientClientsGet().subscribe(clientResponse => {
      this.clientCount = clientResponse.length;
    });

    this.appointmentService.appointmentAppointmentsGet().subscribe(appointmentResponse => {
      this.appointmentCount = appointmentResponse.length;
    });

    this.personalService.personPersonsGet().subscribe(personResponse => {
      this.staffCount = personResponse.length;
    });

    this.locationService.locationLocationsGet().subscribe(locationResponse => {
      this.locationCount = locationResponse.length
    })

  }
}
