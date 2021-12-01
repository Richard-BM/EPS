import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { LocationCreationRequest, LocationService } from '../../api';
import { DisplayLocation } from '../../dashboard/interfaces/DisplayLocation.Interface';

@Component({
  selector: 'app-assistent-location',
  templateUrl: './assistent-location.component.html',
  styleUrls: ['./assistent-location.component.css']
})
export class AssistentLocationComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public locationService: LocationService, private dataStoreService: DatastoreService) { }

  @ViewChild('locationDetailForm') locationDetailForm: NgForm;

  public locationEdit: DisplayLocation;

  ngOnInit(): void {
    this.locationEdit = {
      id: null,
      name: "",
      street: "",
      postalcode: "",
      city: "",
    };
  }

  public onFinish() {
    let newLocation: LocationCreationRequest = {
      name: this.locationEdit.name,
      street: this.locationEdit.street,
      postalcode: this.locationEdit.postalcode,
      city: this.locationEdit.city
    }

    this.locationService.locationLocationsPost(newLocation).subscribe(clientResponse => {
      this.dataStoreService.dataChanged(clientResponse);
      this.ref.close();
    });
  }

  public onExit() {
    this.ref.close();
  }


}
