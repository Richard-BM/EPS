import { Component, Input, OnInit } from '@angular/core';
import { displayProject } from '../interfaces/displayProject.interface';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  @Input() displayProjectDataSource: displayProject[] = [];
  public displayedColumns: string[] = ['name', 'number', 'description'];

  clickedRows = new Set<displayProject>();

  constructor() { }

  ngOnInit(): void {
  }

}
