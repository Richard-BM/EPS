import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../../services/datastore.service';
import { EditServiceService } from '../../../../services/editService.service';
import { AppointmentResponse, AppointmentService, ProjectResponse } from '../../../api';
import { AssistentAppointmentComponent } from '../../../assistant/assistent-appointment/assistent-appointment.component';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { DisplayAppointment } from '../../interfaces/DisplayAppointment.Interface';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe, private translateService: TranslateService
    , public dialogService: DialogService, private dataStoreService: DatastoreService, private editService: EditServiceService) { }

  public appointmentOverviewIsLoading = false;
  public appointmentsColumnDefinitions: ColumnDefinition[] = [];
  public appointmentDataSource: DisplayAppointment[] = [];
  ref: DynamicDialogRef;

  @ViewChild('appointmentTable') appointmentTable: TableComponent;

  ngOnInit(): void {
    this.loadAppointmentDataSource();

    this.dataStoreService.dataChange.subscribe(response => {
      this.loadAppointmentDataSource();
    });
  }

  public loadAppointmentDataSource() {
    this.appointmentOverviewIsLoading = true;

    this.appointmentService.appointmentAppointmentsGet().subscribe(response => {
      this.dataStoreService.appointmentResponse = response;
      this.appointmentDataSource = [];
      this.appointmentsColumnDefinitions = [];

      for (let currentProject of response) {
        this.appointmentDataSource.push(this.createAppointmentDisplayObject(currentProject));
      }

      this.generateAppointmentGridDefinitions();
      this.appointmentOverviewIsLoading = false;
    });
  }

  private createAppointmentDisplayObject(appointmentResponse: AppointmentResponse) {
    let displayAppointment: DisplayAppointment = {
      id: appointmentResponse.appointmentId,
      workerName: appointmentResponse.personResponse?.firstname ? appointmentResponse.personResponse?.firstname  + ", " + appointmentResponse.personResponse?.lastname : "",
      locationName: appointmentResponse.locationResponse?.name ? appointmentResponse.locationResponse?.name : "",
      street: appointmentResponse.locationResponse?.street ? appointmentResponse.locationResponse?.street : "",
      postalcode: appointmentResponse.locationResponse?.postalcode ? appointmentResponse.locationResponse?.postalcode : "",
      city: appointmentResponse.locationResponse?.city ? appointmentResponse.locationResponse?.city : "",
      timeFrom: this.datePipe.transform(appointmentResponse.startDate, 'dd.MM.yyyy, HH:mm').toString(),
      timeTo: this.datePipe.transform(appointmentResponse.endDate, 'dd.MM.yyyy, HH:mm').toString(),
    }

    return displayAppointment;
  }

  public onAppointmentCreate() {
    this.editService.setAppointmentData(null);

    this.ref = this.dialogService.open(AssistentAppointmentComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.PERSONCOMPONENT.CREATEPERSON"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onAppointmentEdit() {
    this.editService.setAppointmentData(this.appointmentDataSource.find(x => x.id == this.appointmentTable.selectedRow.id));
    this.editService.appointmentEdit.changed = true;

    this.ref = this.dialogService.open(AssistentAppointmentComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.PERSONCOMPONENT.CREATEPERSON"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onAppointmentDelete() {
    this.appointmentOverviewIsLoading = true;
    const appointmentId = this.appointmentTable.selectedRow.id
    this.appointmentService.appointmentAppointmentsAppointmentIdDelete(appointmentId).subscribe(response => {
      this.dataStoreService.dataChanged(appointmentId);
      this.appointmentOverviewIsLoading = false;
    });
  }

  public generateAppointmentGridDefinitions() {
    this.appointmentsColumnDefinitions.push(
      {
        header: "Mitarbeiter", field: "workerName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Örtlichkeit", field: "locationName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Straße", field: "street", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Postleitzahl", field: "postalcode", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Stadt", field: "city", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Anfang", field: "timeFrom", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Ende", field: "timeTo", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      }
    );
  }

}
