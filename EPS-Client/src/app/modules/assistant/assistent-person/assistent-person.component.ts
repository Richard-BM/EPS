import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../services/datastore.service';
import { AuthenticationService, PersonService, RegisterRequest } from '../../api';
import { DisplayPerson } from '../../dashboard/interfaces/DisplayPerson.Interface';

@Component({
  selector: 'app-assistent-person',
  templateUrl: './assistent-person.component.html',
  styleUrls: ['./assistent-person.component.css']
})
export class AssistentPersonComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public authService: AuthenticationService, private dataStoreService: DatastoreService) { }

  @ViewChild('personDetailForm') personDetailForm: NgForm;


  public personEdit: DisplayPerson

  ngOnInit(): void {
    this.personEdit = {
      id: null,
      firstname: "",
      lastname: "",
      password: "",
      dateOfBirth: "",
      email:""
    }
  }

  public onFinish() {
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

  public onExit() {
    this.ref.close();
  }

}
