import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeat } from 'rxjs/operators';
import { DatastoreService } from '../../../../services/datastore.service';
import { EditServiceService } from '../../../../services/editService.service';
import { AppointmentService, PersonResponse, PersonService } from '../../../api';
import { AssistentPersonComponent } from '../../../assistant/assistent-person/assistent-person.component';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { DisplayPerson } from '../../interfaces/DisplayPerson.Interface';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  @ViewChild('personTable') personTable: TableComponent;

  constructor(private personService: PersonService, private datePipe: DatePipe, private translateService: TranslateService
    , public dialogService: DialogService, private dataStoreService: DatastoreService, private editService: EditServiceService) { }

  public personOverviewIsLoading = false;
  public personsColumnDefinitions: ColumnDefinition[] = [];
  public personDataSource: DisplayPerson[] = [];
  ref: DynamicDialogRef;


  ngOnInit(): void {
    this.loadPersonDataSource();

    this.dataStoreService.dataChange.subscribe(response => {
      this.loadPersonDataSource();
    });
  }

  public loadPersonDataSource() {
    this.personOverviewIsLoading = true;

    this.personService.personPersonsGet().subscribe(response => {
      this.personDataSource = [];
      this.personsColumnDefinitions = [];

      for (let currentPerson of response) {
        this.personDataSource.push(this.createPersonDisplayObject(currentPerson));
      }

      this.generatePersonGridDefinitions();
      this.personOverviewIsLoading = false;
    });
  }

  private createPersonDisplayObject(responsePerson: PersonResponse) {
    let displayPerson: DisplayPerson = {
      id: responsePerson.personId,
      firstname: responsePerson.firstname,
      lastname: responsePerson.lastname,
      email: responsePerson.eMail,
      dateOfBirth: this.datePipe.transform(responsePerson.dateOfBirth, 'dd.MM.yyyy').toString(),
      password: ""
    }

    return displayPerson;
  }

  public onPersonCreate() {
    this.editService.setPersonData(null);

    this.ref = this.dialogService.open(AssistentPersonComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.PERSONCOMPONENT.CREATEPERSON"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onPersonEdit() {
    this.editService.setPersonData(this.personDataSource.find(x => x.id == this.personTable.selectedRow.id));
    this.editService.personEdit.changed = true;

    this.ref = this.dialogService.open(AssistentPersonComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.PERSONCOMPONENT.EDITPERSON"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onPersonDelete() {
    this.personOverviewIsLoading = true;

    const personId = this.personTable.selectedRow.id

    this.personService.personPersonsPersonIdDelete(personId).subscribe(response => {
      this.dataStoreService.dataChanged(personId);
      this.personOverviewIsLoading = false;
    });
  }

  public generatePersonGridDefinitions() {
    this.personsColumnDefinitions.push(
      {
        header: "Vorname", field: "firstname", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Nachname", field: "lastname", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "E-Mail", field: "email", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Geb. ", field: "dateOfBirth", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      }
    );
  }
}
