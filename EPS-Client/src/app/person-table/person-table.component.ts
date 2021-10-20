import { Component, Input, OnInit } from '@angular/core';
import { displayPerson } from '../interfaces/displayPerson.interface';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  @Input() displayPersonDataSource: displayPerson[] = [];
  public displayedColumns: string[] = ['firstname', 'lastname', 'email', 'dateOfBirth'];

  clickedRows = new Set<displayPerson>();

  constructor() { }

  ngOnInit(): void {
  }

}
