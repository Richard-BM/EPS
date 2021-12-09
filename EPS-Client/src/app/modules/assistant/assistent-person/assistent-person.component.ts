import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { EditServiceService } from '../../../services/editService.service';
import { AuthenticationService, PersonEditRequest, PersonService, RegisterRequest } from '../../api';
import { DisplayPerson } from '../../dashboard/interfaces/DisplayPerson.Interface';

@Component({
  selector: 'app-assistent-person',
  templateUrl: './assistent-person.component.html',
  styleUrls: ['./assistent-person.component.css']
})
export class AssistentPersonComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public authService: AuthenticationService, private dataStoreService: DatastoreService
    , private editService: EditServiceService, private personService: PersonService) { }

  @ViewChild('personDetailForm') personDetailForm: NgForm;


  public personEdit: DisplayPerson

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.personEdit = this.editService.personEdit;

    if (this.personEdit.isNew) {
      this.personEdit.firstname = "";
      this.personEdit.lastname = "";
      this.personEdit.email = "";
      this.personEdit.password = "";
      this.personEdit.dateOfBirth = "";
    }
  }

  public onFinish() {
    if (this.personEdit.changed) {
      let changedPerson: PersonEditRequest = {
        firstname: this.personEdit.firstname,
        lastname: this.personEdit.lastname,
        email: this.personEdit.email,
        dateOfBirth: new Date(this.personEdit.dateOfBirth)
      }

      this.personService.personPersonsLocationIdPut(this.personEdit.id, changedPerson).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });


    } else if (this.personEdit.isNew) {
      let newPerson: RegisterRequest = {
        firstname: this.personEdit.firstname,
        lastname: this.personEdit.lastname,
        email: this.personEdit.email,
        password: this.personEdit.password,
        dateOfBirth: new Date(this.personEdit.dateOfBirth)
      }

      this.authService.authenticationRegisterPost(newPerson).subscribe(clientResponse => {
        this.dataStoreService.dataChanged(clientResponse);
        this.ref.close();
      });
    }
  }

  public onExit() {
    this.ref.close();
  }

}
