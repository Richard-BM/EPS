import { Component, Input, OnInit } from '@angular/core';
import { displayAppointment } from '../interfaces/displayAppointment.interface';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {

  @Input() displayAppointmentDataSource: displayAppointment[] = [];
  public displayedColumns: string[] = ['personName', 'locationName', 'projectName', 'startDate', 'endDate'];

  clickedRows = new Set<displayAppointment>();

  constructor() { }

  ngOnInit(): void {

  }

}
