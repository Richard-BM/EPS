import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { EditServiceService } from '../../../services/editService.service';
import { ClientResponse, ClientService, ProjectCreationRequest, ProjectEditRequest, ProjectService } from '../../api';
import { DisplayProjects } from '../../dashboard/interfaces/DisplayProjects.Interface';

@Component({
  selector: 'app-assistent-project',
  templateUrl: './assistent-project.component.html',
  styleUrls: ['./assistent-project.component.css']
})
export class AssistentProjectComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, private projectService: ProjectService, private clientService: ClientService
    , private dataStoreService: DatastoreService, private editService: EditServiceService) { }

  @ViewChild('projectDetailForm') projectDetailForm: NgForm;

  public projectEdit: DisplayProjects;
  public clients: ClientResponse[] = [];
  public selectedClient: ClientResponse;
 
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.projectEdit = this.editService.projectEdit;

    this.clientService.clientClientsGet().subscribe(response => {
      this.clients = response;

      if (this.editService.projectEdit.isNew) {
        this.projectEdit.name = ""
        this.projectEdit.clientName = ""
        this.projectEdit.number = ""
        this.projectEdit.description = ""
      } else {
        this.selectedClient = this.clients.find(x => x.name === this.projectEdit.clientName);
      }
    });
  }

  public onFinish() {

    if (this.projectEdit.changed) {
      let changedProject: ProjectEditRequest = {
        clientId: this.selectedClient.clientId,
        name: this.projectEdit.name,
        number: this.projectEdit.number,
        description: this.projectEdit.description      
      }

      this.projectService.projectProjectIdPut(this.projectEdit.id, changedProject).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });

    } else if (this.projectEdit.isNew) {
      let newProject: ProjectCreationRequest = {
        clientId: this.selectedClient.clientId,
        name: this.projectEdit.name,
        number: this.projectEdit.number,
        description: this.projectEdit.description
      }

      this.projectService.projectPost(newProject).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });
    }
  }

  public onExit() {
    this.ref.close();
  }

}
