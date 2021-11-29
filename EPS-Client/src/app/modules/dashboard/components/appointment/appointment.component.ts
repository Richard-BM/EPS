import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { repeat } from 'rxjs/operators';
import { StatusType } from '../../../../enums/statusType.enum';
import { timeStringToDate } from '../../../../logic/date.extensions';
import { currentAppointmentStatusGet } from '../../../../logic/utils';
import { AppointmentResponse, AppointmentsService, ClientResponse, StatusResponse } from '../../../api';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { FilterItem } from '../../../commonUi/interfaces/filterItem';
import { ModalDialogWizardComponent } from '../../../wizard/components/modalDialogWizard/modalDialogWizard.component';
import { WizardBaseService } from '../../../wizard/services/wizardBaseService.service';
import { AppointmentEdit } from '../../interfaces/appointmentEdit.Interface';
import { DisplayAppointment } from '../../interfaces/displayAppointment.Interface';
import { AppointmentEditService } from '../../services/appointmentEditService.service';
import { AppointmentGeneralService } from '../../services/appointmentGeneralService.service';
import { AppointmentAssistantComponent } from '../appointmentAssistant/appointmentAssistant.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [DialogService, MessageService]
})
export class AppointmentComponent implements OnInit {

    constructor(private wizardBaseService: WizardBaseService, private appointmentEditService: AppointmentEditService,
        public dialogService: DialogService, public messageService: MessageService, private translateService: TranslateService
        , private appointmentGeneralService: AppointmentGeneralService, private appointmentsService: AppointmentsService
        , private confirmationService: ConfirmationService) { }

    @ViewChild('appointmentTable') appointmentTable: TableComponent;

    public appointmentOverviewIsLoading = false;
    public appointmentColumnDefinitions: ColumnDefinition[] = [];
    public appointmentDataSource: DisplayAppointment[] = [];
    private statusFromSelectedProjects: StatusResponse[];
    private appointmentEdits: AppointmentEdit[] = [];

    ref: DynamicDialogRef;

    ngOnInit(): void {

        this.appointmentGeneralService.appointmentFilterRequestEvent.subscribe(event => {
            this.loadAppointmentDataSource();
        });
    }

    private generateAppointmentGridDefinitions() {

        this.appointmentColumnDefinitions = [];

        if (this.appointmentGeneralService.selectedProjects && this.appointmentGeneralService.selectedProjects.length > 1) {
            this.appointmentColumnDefinitions.push(
                {
                    header: "Projekt", field: "projectName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.MultiSelect,
                    center: false, width: 150, editable: false, toolTip: null,
                    filterItems: this.appointmentGeneralService.selectedProjects.map(project => { return { label: project.name, value: project.name } })
                },

            );
        }


        this.appointmentColumnDefinitions.push(
            {
                header: "Datum", field: "date", displayType: ColumnDisplayType.Date, filterType: ColumnFilterType.Date,
                center: true, width: 150, editable: false, toolTip: null
            },
            {
                header: "Uhrzeit von", field: "timeFrom", displayType: ColumnDisplayType.Time, filterType: ColumnFilterType.DateTime,
                center: true, width: 160, editable: false, toolTip: null
            },
            {
                header: "Uhrzeit bis", field: "timeTo", displayType: ColumnDisplayType.Time, filterType: ColumnFilterType.DateTime,
                center: true, width: 160, editable: false, toolTip: null
            },
            {
                header: "Personalanfrage", field: "requestedContractorName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 160, editable: false, toolTip: null
            },
            {
                header: "Terminstatus", field: "appointmentStatusName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.MultiSelect,
                width: 175, center: false, editable: false, toolTip: null,
                filterItems: this.getStatusFilterItems([StatusType.AppointmentStatusCancelled, StatusType.AppointmentStatusConfirmed,
                    , StatusType.AppointmentStatusPending, StatusType.AppointmentStatusPlanned, StatusType.AppointmentStatusRegistered])
            },
            {
                header: "Marktname", field: "locationName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 160, editable: false, toolTip: null
            },
            {
                header: "Straße", field: "locationStreet", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 150, editable: false, toolTip: null
            },
            {
                header: "PLZ", field: "locationPostalcode", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: true, width: 110, editable: false, toolTip: null
            },
            {
                header: "Ort", field: "locationCity", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 150, editable: false, toolTip: null
            },
        );
    }


    public onAppointmentCreate() {
        this.appointmentEditService.setData(null);

        this.ref = this.dialogService.open(AppointmentAssistantComponent, {
            header: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.CREATIONTITLE"),
            width: '80%',
            contentStyle: { "max-height": "600px", "overflow": "auto" },
            baseZIndex: 10000
        })
    }

    public onAppointmentEdit() {
        if (this.appointmentTable.selectedRow.appointmentStatusType === 2) {
            this.appointmentEditService.setData(this.appointmentEdits.find(find => find.id == this.appointmentTable.selectedRow.id));
            this.appointmentEditService.appointmentEdit.changed = true;

            this.ref = this.dialogService.open(AppointmentAssistantComponent, {
                header: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.EDITTITLE"),
                width: '80%',
                contentStyle: { "max-height": "600px", "overflow": "auto" },
                baseZIndex: 10000
            });
        } else {
            this.messageService.add({
                severity: 'warn', summary: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTAUTHORIZATION")
                , detail: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTDELETENOTAUTHORIZED")
            });
        }
    }

    public onAppointmentDelete() {

        if (this.appointmentTable.selectedRow.appointmentStatusType === 2) {
            this.confirmationService.confirm({
                header: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.DELETEAPPOINTMENT"),
                message: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.DELETEAPPOINTMENTQUESTION"),
                acceptVisible: true,
                acceptLabel: this.translateService.instant("COMMON.YES"),
                rejectVisible: true,
                rejectLabel: this.translateService.instant("COMMON.NO"),
                icon: "pi pi-question-circle",
                accept: () => {
                    this.appointmentOverviewIsLoading = true;
                    this.appointmentsService.appointmentsDelete(this.appointmentTable.selectedRow.id).subscribe(response => {
                        this.loadAppointmentDataSource();

                        this.appointmentOverviewIsLoading = false;
                    }, err => {
                        if (err.status === 401) {
                            this.messageService.add({
                                severity: 'error', summary: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTAUTHORIZATION")
                                , detail: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTDELETENOTAUTHORIZED")
                            });
                        }

                        this.appointmentOverviewIsLoading = false;
                    });
                }
            });
        } else {
            this.messageService.add({
                severity: 'warn', summary: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTAUTHORIZATION")
                , detail: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTCOMPONENT.APPOINTMENTDELETENOTAUTHORIZED")
            });
        }
    }

    public loadAppointmentDataSource() {
        this.appointmentOverviewIsLoading = true;

        if (this.appointmentGeneralService.selectedProjects.length > 0) {
            let projectIds = this.appointmentGeneralService.selectedProjects.map(project => project.id).join(",");

            this.appointmentsService.appointmentsGet(true, projectIds, true).subscribe(response => {

                this.statusFromSelectedProjects = this.appointmentGeneralService.selectedProjects.flatMap(x => x.status);
                this.appointmentDataSource = [];
                this.appointmentEdits = [];

                for (let responseAppointment of response) {
                    this.appointmentDataSource.push(this.createAppointmentDisplayObject(responseAppointment));
                    this.appointmentEdits.push(this.createAppointmentEditObject(responseAppointment));
                }

                this.generateAppointmentGridDefinitions();
                this.appointmentOverviewIsLoading = false;
            });
        } else {
            this.appointmentColumnDefinitions = [];
            this.appointmentDataSource = [];
            this.appointmentOverviewIsLoading = false;
        }
    }


    private createAppointmentDisplayObject(responseAppointment: AppointmentResponse) {
        let currentAppointmentStatus = currentAppointmentStatusGet(responseAppointment.appointmentStatus);
        let appointmentStatus = currentAppointmentStatus ? this.statusFromSelectedProjects.find(x => x.id == currentAppointmentStatus.statusId) : null;
        let mainAddress = responseAppointment.assignedLocation.addresses.find(find => find.priority === 1);
        let project = this.appointmentGeneralService.selectedProjects.find(find => find.id === responseAppointment.projectId);
        let personalRequest;

        for (let currentAppointmentStatusSearch of responseAppointment.appointmentStatus) {
            if (currentAppointmentStatusSearch.statusId === '2238ebb2-adad-43fe-a411-fec69226b9d7') {
                personalRequest = currentAppointmentStatusSearch.remarkInternal?.replace("Personalanfrage:", "");
            }
        }

        let displayAppointment: DisplayAppointment = {
            id: responseAppointment.id,
            date: responseAppointment.date,
            timeFrom: timeStringToDate(responseAppointment.timeFrom),
            timeTo: timeStringToDate(responseAppointment.timeTo),
            locationName: responseAppointment.assignedLocation.name,
            locationStreet: mainAddress.street,
            requestedContractorName: personalRequest,
            locationCity: mainAddress.city,
            locationPostalcode: mainAddress.postalcode,
            projectName: project.name,
            appointmentStatusName: appointmentStatus ? appointmentStatus.name : null,
            appointmentStatusType: appointmentStatus.statusTypeId
        }


        return displayAppointment;
    }

    private createAppointmentEditObject(responseAppointment: AppointmentResponse) {
        let currentAppointmentStatus = currentAppointmentStatusGet(responseAppointment.appointmentStatus);
        let appointmentStatus = currentAppointmentStatus ? this.statusFromSelectedProjects.find(x => x.id == currentAppointmentStatus.statusId) : null;
        let mainAddress = responseAppointment.assignedLocation.addresses.find(find => find.priority === 1);

        let editAppointment: AppointmentEdit = {
            id: responseAppointment.id,
            date: responseAppointment.date,
            timeFrom: timeStringToDate(responseAppointment.timeFrom),
            timeTo: timeStringToDate(responseAppointment.timeTo),
            appointmentStatusName: appointmentStatus ? appointmentStatus.name : null,
            activityId: responseAppointment.projectId,
            locationId: responseAppointment.assignedLocation.id,
            locationStreet: mainAddress.street,
            locationPostalcode: mainAddress.postalcode,
            locationName: responseAppointment.assignedLocation.name,
            locationCity: mainAddress.city,
            changed: false,
            isNew: false,
        }

        return editAppointment;
    }

    private getStatusFilterItems(statusTypes: StatusType[], customFilterItems?: FilterItem[]) {
        let status = this.appointmentGeneralService.selectedProjects.flatMap(x => x.status).sort((a, b) => a.position - b.position);
        let items: FilterItem[] = [];

        for (let currentStatus of status) {
            if (statusTypes.some(statusType => statusType == currentStatus.statusTypeId))
                items.push({ label: currentStatus.name, value: currentStatus.name });
        }

        if (customFilterItems)
            items.push(...customFilterItems);

        return items;
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}
