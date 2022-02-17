import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { EditServiceService } from '../../../services/editService.service';
import { ClientCreationRequest, ClientEditRequest, ClientService } from '../../api';
import { DisplayClient } from '../../dashboard/interfaces/DisplayClient.Interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService, public ref: DynamicDialogRef, private dataStoreService: DatastoreService
    , private editService: EditServiceService) { }

  @ViewChild('clientDetailForm') clientDetailForm: NgForm;
  public clientEdit: DisplayClient;


  ngOnInit(): void {
    this.loadData();
  }


  private loadData() {
    this.clientEdit = this.editService.clientEdit;

    if (this.editService.clientEdit.isNew) {
      this.clientEdit.name = ""
    }

  }

  public onFinish() {
    if (this.clientEdit.changed) {
      let changedClient: ClientEditRequest = {
        name: this.clientEdit.name
      }

      this.clientService.clientClientIdPut(this.clientEdit.id, changedClient).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });


    } else if (this.clientEdit.isNew) {
      let newClient: ClientCreationRequest = {
        name: this.clientEdit.name
      }

      this.clientService.clientClientsPost(newClient).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });
    }
  }

  public onExit() {
    this.ref.close();
  }
}
