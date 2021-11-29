import { Component, Input, OnInit } from '@angular/core';
import { displayClient } from '../interfaces/displayClient.interface';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {

  @Input() displayClientDataSource: displayClient[] = [];
  public displayedColumns: string[] = ['name'];

  clickedRows = new Set<displayClient>();

  constructor() { }

  ngOnInit(): void {
  }

}
