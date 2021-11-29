import { EventEmitter, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Console, table } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabView } from 'primeng/tabview';
import { timeStringToDate } from '../../../../logic/date.extensions';
import { LanguageService } from '../../../../services/language.service';
import { AppointmentCreationRequest, AppointmentEditRequest, AppointmentsService, LocationResponse, LocationService, PersonResponse, ProjectResponse } from '../../../api';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { WizardBaseService } from '../../../wizard/services/wizardBaseService.service';
import { AppointmentEdit } from '../../interfaces/appointmentEdit.Interface';
import { DisplayAppointment } from '../../interfaces/displayAppointment.Interface';
import { DisplayLocation } from '../../interfaces/displayLocation';
import { LocationSearch } from '../../interfaces/locationSearch.Interface';
import { AppointmentEditService } from '../../services/appointmentEditService.service';
import { AppointmentGeneralService } from '../../services/appointmentGeneralService.service';

@Component({
  selector: 'app-appointmentAssistant',
  templateUrl: './appointmentAssistant.component.html',
  styleUrls: ['./appointmentAssistant.component.css'],
  providers: [ConfirmDialogModule]
})
export class AppointmentAssistantComponent implements OnInit {

    constructor(private wizardBaseService: WizardBaseService, private languageService: LanguageService
        , private translateService: TranslateService, private appointmentEditService: AppointmentEditService
        , private confirmationService: ConfirmationService, public ref: DynamicDialogRef, public appointmentGeneralService: AppointmentGeneralService
        , private change: ChangeDetectorRef, private locationService: LocationService, private appointmentService: AppointmentsService
        , public messageService: MessageService) { }

    @ViewChild("appointmentTabView") appointmentTabView: TabView;
    @ViewChild('appointmentDetailForm') appointmentDetailForm: NgForm;
    @ViewChild('appointmentLocationForm') appointmentLocationForm: NgForm;
    @ViewChild('locationTable') locationTable: TableComponent;

    public locationOverviewIsLoading = false;

    public appointmentEdit: AppointmentEdit;
    public locationSearch: LocationSearch = {};

    public selectedProject: ProjectResponse;
    public selectedLocation: LocationResponse;

    public locationColumnDefinitions: ColumnDefinition[] = [];
    public locationDataSource: DisplayLocation[] = [];

    public index: number = 0;

    ngOnInit(): void {
        this.languageService.preLoadTranslations().subscribe(next => {
            this.loadData();
        });
    }

    public onNext() {
        this.index = (this.index === 1) ? 0 : this.index + 1;
    }

    public onPrevious() {
        this.index = (this.index === 0) ? 1 : this.index - 1;
    }

    public onExit() {
        this.confirmationService.confirm({
            accept: () => {
                this.confirmationService.close();
                this.ref.close();
            }
        });
    }

    public onSearch() {
        this.locationDataSource = [];
        this.locationOverviewIsLoading = true;

        this.locationService.locationGet(this.selectedProject.id, this.locationSearch.locationName, this.locationSearch.locationCity, this.locationSearch.locationPostalcode, this.locationSearch.locationSearchRadius).subscribe(response => {

            for (let locationResponse of response) {
                this.createDisplayLocationObjects(locationResponse);
            }

            this.locationOverviewIsLoading = false;
        }, err => {
            this.locationOverviewIsLoading = false;
        });
    }

    public loadData() {
        this.generateLocationGridDefinitions();

        if (this.appointmentDetailForm) {
            this.appointmentDetailForm.resetForm();

            this.change.markForCheck();
            this.change.detectChanges();
        }

        this.appointmentEdit = this.appointmentEditService.appointmentEdit;

        if (this.appointmentEdit.changed) {
            this.loadChangedAppointment();
        }

        this.change.detectChanges();
    }

    public loadChangedAppointment() {
        this.appointmentEdit.date = new Date(this.appointmentEdit.date);

        this.locationSearch = {
            locationCity: this.appointmentEdit.locationCity,
            locationPostalcode: this.appointmentEdit.locationPostalcode,
            locationName: this.appointmentEdit.locationName
        }

        this.selectedProject = this.appointmentGeneralService.selectedProjects.find(find => find.id == this.appointmentEdit.activityId);

        let displayLocation: DisplayLocation = {
            id: this.appointmentEdit.activityId,
            street: this.appointmentEdit.locationStreet,
            postalcode: this.appointmentEdit.locationPostalcode,
            city: this.appointmentEdit.locationCity,
            name: this.appointmentEdit.locationName,
        }


        this.locationDataSource.push(displayLocation);

        this.change.detectChanges();
        this.locationTable.selectedRow = displayLocation;
    }

    private generateLocationGridDefinitions() {
        this.locationColumnDefinitions = [];

        this.locationColumnDefinitions.push(
            {
                header: "Marktname", field: "name", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 160, editable: false, toolTip: null
            },
            {
                header: "Straße", field: "street", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 150, editable: false, toolTip: null
            },
            {
                header: "PLZ", field: "postalcode", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: true, width: 110, editable: false, toolTip: null
            },
            {
                header: "Ort", field: "city", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
                center: false, width: 150, editable: false, toolTip: null
            });
    }

    private createDisplayLocationObjects(responseLocation: LocationResponse) {
        let mainAddress = responseLocation.addresses.find(find => find.priority === 1);

        let location: DisplayLocation = {
            id: responseLocation.id,
            name: responseLocation.name,
            street: mainAddress.street,
            postalcode: mainAddress.postalcode,
            city: mainAddress.city
        }

        this.locationDataSource.push(location);
    }

    public onFinish(event: MouseEvent) {
        if (this.appointmentEdit.isNew) {
            let newAppointment: AppointmentCreationRequest = {
                activityId: this.selectedProject.id,
                date: this.appointmentEdit.date,
                plannedFrom: null,
                plannedTo: null,
                timeFrom: this.appointmentEdit.timeFrom ? this.appointmentEdit.timeFrom.toLocaleTimeString() : null,
                timeTo: this.appointmentEdit.timeTo ? this.appointmentEdit.timeTo.toLocaleTimeString() : null,
                preferredContractor: this.appointmentEdit.requestedContractorName,
                assignedLocationId: this.locationTable.selectedRow.id
            }


            this.appointmentService.appointmentsPost(newAppointment).subscribe(response => {
                this.appointmentService.appointmentsAppointmentIdGet(response, true).subscribe(appointmentResponse => {
                    this.appointmentGeneralService.emitAppointmentFilterEvent(event);

                    this.ref.close();

                    if (appointmentResponse != null) {
                        this.messageService.add({
                            severity: 'success', summary: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.APPOINTMENTMESSAGECREATEDTITLE")
                            , detail: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.APPOINTMENTSUCCESSFULCREATED")
                        });
                    }
                });
            });
        }

        if (this.appointmentEdit.changed) {
            let appointmentEditRequest: AppointmentEditRequest = {
                date: this.appointmentEdit.date,
                plannedFrom: this.appointmentEdit.plannedFrom,
                plannedTo: this.appointmentEdit.plannedTo,
                timeFrom: this.appointmentEdit.timeFrom ? this.appointmentEdit.timeFrom.toLocaleTimeString() : null,
                timeTo: this.appointmentEdit.timeTo ? this.appointmentEdit.timeTo.toLocaleTimeString() : null,
                assignedLocationId: this.locationTable.selectedRow.id,
            }

            this.appointmentService.appointmentsAppointmentIdPut(this.appointmentEdit.id, appointmentEditRequest).subscribe(response => {
                this.appointmentGeneralService.emitAppointmentFilterEvent(event);
                this.ref.close();

                this.messageService.add({
                    severity: 'success', summary: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.APPOINTMENTMESSAGEEDITTITLE")
                    , detail: this.translateService.instant("DASHBOARDMODULE.APPOINTMENTASSISTENTCOMPONENT.APPOINTMENTSUCCESSFULEDITED")
                });
            });
        }
    }

}
