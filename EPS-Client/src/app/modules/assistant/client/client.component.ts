import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { ClientCreationRequest, ClientService } from '../../api';
import { DisplayClient } from '../../dashboard/interfaces/displayClient.Interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService, public ref: DynamicDialogRef, private dataStoreService: DatastoreService) { }

  @ViewChild('clientDetailForm') clientDetailForm: NgForm;
  public clientEdit: DisplayClient;


  ngOnInit(): void {
    this.clientEdit = {
      id: null,
      name: ""
    }
  }

  public onFinish() {
    let newClient: ClientCreationRequest = {
      name: this.clientEdit.name
    }

    this.clientService.clientClientsPost(newClient).subscribe(clientResponse => {
      this.dataStoreService.dataChanged(clientResponse);
      this.ref.close();
    });
  }

  public onExit() {
    this.ref.close();
  }
}
