import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { EditServiceService } from '../../../services/editService.service';
import { LocationCreationRequest, LocationEditRequest, LocationService } from '../../api';
import { DisplayLocation } from '../../dashboard/interfaces/DisplayLocation.Interface';

@Component({
  selector: 'app-assistent-location',
  templateUrl: './assistent-location.component.html',
  styleUrls: ['./assistent-location.component.css']
})
export class AssistentLocationComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public locationService: LocationService, private dataStoreService: DatastoreService
    , private editService: EditServiceService) { }

  @ViewChild('locationDetailForm') locationDetailForm: NgForm;

  public locationEdit: DisplayLocation;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.locationEdit = this.editService.locationEdit;

    if (this.editService.locationEdit.isNew) {
      this.locationEdit.name = ""
      this.locationEdit.street = ""
      this.locationEdit.postalcode = ""
      this.locationEdit.city = ""
    }
  }

  public onFinish() {
    if (this.locationEdit.changed) {
      let changedLocation: LocationEditRequest = {
        name: this.locationEdit.name,
        street: this.locationEdit.street,
        postalcode: this.locationEdit.postalcode,
        city: this.locationEdit.city
      }

      this.locationService.locationLocationsLocationIdPut(this.locationEdit.id, changedLocation).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });

    } else if (this.locationEdit.isNew) {
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
  }

  public onExit() {
    this.ref.close();
  }
}
