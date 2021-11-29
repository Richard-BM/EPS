import { Component, Input, OnInit } from '@angular/core';
import { displayLocation } from '../interfaces/displayLocation.interface';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnInit {

  @Input() displayLocationDataSource: displayLocation[] = [];
  public displayedColumns: string[] = ['name', 'street', 'postalCode', 'city'];

  clickedRows = new Set<displayLocation>();

  constructor() { }

  ngOnInit(): void {
  }

}
