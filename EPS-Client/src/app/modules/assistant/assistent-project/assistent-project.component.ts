import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { ClientResponse, ClientService, ProjectCreationRequest, ProjectService } from '../../api';
import { DisplayProjects } from '../../dashboard/interfaces/DisplayProjects.Interface';

@Component({
  selector: 'app-assistent-project',
  templateUrl: './assistent-project.component.html',
  styleUrls: ['./assistent-project.component.css']
})
export class AssistentProjectComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, private projectService: ProjectService, private clientService: ClientService
    , private dataStoreService: DatastoreService) { }

  @ViewChild('projectDetailForm') projectDetailForm: NgForm;

  public projectEdit: DisplayProjects;
  public clients: ClientResponse[] = [];
  public selectedClient: ClientResponse;
 
  ngOnInit(): void {
    this.clientService.clientClientsGet().subscribe(response => {
      this.clients = response;
    });


    this.projectEdit = {
      id: null,
      clientName: "",
      name: "",
      number: "",
      description: ""
    };
  }

  public onFinish() {
    let newProject: ProjectCreationRequest = {
      clientId: this.selectedClient.clientId,
      name: this.projectEdit.name,
      number: this.projectEdit.number,
      description: this.projectEdit.description
    }

    this.projectService.projectProjectPost(newProject).subscribe(clientResponse => {
      this.dataStoreService.dataChanged(clientResponse);
      this.ref.close();
    });
  }

  public onExit() {
    this.ref.close();
  }

}
