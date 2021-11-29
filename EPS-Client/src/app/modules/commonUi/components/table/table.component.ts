import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterService, MenuItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { InputNumber } from 'primeng/inputnumber';
import { Table } from 'primeng/table';
import { DataLockedType } from '../../../../enums/dataLockedType.enum';
import { DataLockedResponse, DataLockedService } from '../../../api';
import { AuthenticationHandlerService } from '../../../auth/services/authenticationhandler.service';
import { ColumnDisplayType } from '../../enums/columnDisplayType.enum';
import { ColumnDefinition } from '../../interfaces/columnDefinition.interface';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

    @Input() columnDefinitions: ColumnDefinition[];
    @Input() dataSource: any[];
    @Input() scrollHeight: string = "600px";
    @Input() paginator = false;
    @Input() rows: number = 50;
    @Input() rowsPerPageOptions: number[] = [10, 25, 50, 100];
    @Input() showLoadingSymbol = false;
    @Input() editable = false;
    @Input() dataLockedType: DataLockedType;

    @Output() onEditCompleted = new EventEmitter();

    @ContentChild("tableToolbar", { static: true }) customToolbarTemplate: TemplateRef<any>;
    @ViewChild("table") table: Table;
    @ViewChildren('cellInput') cellInputList: QueryList<ElementRef>;

    public exportButtonItems: MenuItem[];
    private editValueBackup: any;
    public editTooltip: string;
    private currentCellInput: ElementRef;
    public editModeActivated: boolean = false;
    selectedRow: any;

    constructor(private filterService: FilterService, private datePipe: DatePipe
        , private dataLockedService: DataLockedService, private authHandler: AuthenticationHandlerService
        , private translateService: TranslateService, private renderer: Renderer2) {
        this.filterService.register('dateRange', (value, filter): boolean => {

            if (!filter)
                return true;

            if (!value)
                return false;

            let fromDate = filter && filter.length > 0 && filter[0] ? filter[0] : null;
            let toDate = filter && filter.length > 1 && filter[1] ? filter[1] : null;
            value = new Date(new Date(value).toDateString());

            if (fromDate && toDate && value.getTime() >= fromDate.getTime() && value.getTime() <= toDate.getTime())
                return true;
            else if (fromDate && !toDate && value.getTime() === fromDate.getTime())
                return true;
            else if (!fromDate && toDate && value.getTime() === toDate.getTime())
                return true;

            return false;
        });

        this.filterService.register('timeEquals', (value, filter): boolean => {

            if (!filter)
                return true;

            if (!value)
                return false;

            value = new Date(value);

            if (value.getHours() === filter.getHours() && value.getMinutes() === filter.getMinutes())
                return true;

            return false;
        });
    }
    ngAfterViewInit(): void {
        this.cellInputList.changes.subscribe(change => {
            this.currentCellInput = change.last;
        })
    }

    ngOnInit(): void {

        this.exportButtonItems = [
            { label: 'CSV', icon: "pi pi-file-o", command: this.exportCSV.bind(this) },
            { label: 'Excel', icon: "pi pi-file-excel", command: this.exportExcel.bind(this) }
        ]
    }

    public resetAllFilters() {
        this.table.clear();
    }

    private setDataLockedToolTip(dataLocked: DataLockedResponse) {

        if (dataLocked)
            this.editTooltip = this.translateService.instant("COMMONUIMODULE.TABLECOMPONENT.EDITLOCKED") + ": "
                + dataLocked.lockedByPerson.lastname + ", "
                + dataLocked.lockedByPerson.firstname;
    }

    public onEditInit(event) {

        this.editValueBackup = event.data[event.field];
        let item = this.dataSource.find(find => find.id == event.data.id);
        let columnDefinition = this.columnDefinitions.find(find => find.field == event.field);
        item.editable = false;
        this.editTooltip = null;
        this.editModeActivated = true;

        if (!columnDefinition.cellEditablePredicate || columnDefinition.cellEditablePredicate(item)) {
            if (this.dataLockedType) {
                this.dataLockedService.dataLockedEntityIdGet(item.id, true).subscribe(response => {
                    //TOOD: Möglicher Bug. Erstellen und löschen von DataLocked - Datensätzen können sich zeitlich überschneiden,
                    //    wenn man zwischen Zellen wechselt(???).
                    if (!response || response.lockedByPerson.id == this.authHandler.getUserId()) {
                        this.dataLockedService.dataLockedPost({
                            lockedEntityId: item.id,
                            dataLockedTypeId: this.dataLockedType,
                            lockedByPersonId: this.authHandler.getUserId()
                        }).subscribe(response => {
                            item.editable = true;
                            this.focusCellInput(columnDefinition.displayType);
                        });
                    }
                    else {
                        this.setDataLockedToolTip(response);
                        item.editable = false;
                    }
                });
            }
            else {
                item.editable = true;
                this.focusCellInput(columnDefinition.displayType);
            }
        }
        else
            this.editTooltip = columnDefinition.cellNotEditableTooltip;
    }

    public onEditCancel(event) {

        let item = this.dataSource.find(find => find.id == event.data.id);
        item[event.field] = this.editValueBackup;
        this.editValueBackup = null;
        this.editModeActivated = false;

        if (this.dataLockedType)
            this.dataLockedService.dataLockedEntityIdDelete(item.id).subscribe();
    }

    public onEditComplete(event) {

        let item = this.dataSource.find(find => find.id == event.data.id);
        let columnDefinition = this.columnDefinitions.find(find => find.field == event.field);

        if (columnDefinition.mandatory && !item[event.field])
            item[event.field] = this.editValueBackup;
        else
            this.onEditCompleted.emit(event);

        this.editValueBackup = null;
        this.editModeActivated = false;

        if (this.dataLockedType)
            this.dataLockedService.dataLockedEntityIdDelete(event.data.id).subscribe();
    }

    private focusCellInput(columnDisplayTyoe: ColumnDisplayType) {
        setTimeout(() => {

            if (this.currentCellInput) {
                switch (columnDisplayTyoe) {
                    case ColumnDisplayType.String:
                        this.currentCellInput.nativeElement.focus();
                        break;
                    case ColumnDisplayType.Number:
                    case ColumnDisplayType.NumberDecimal:
                        (<unknown>this.currentCellInput as InputNumber).input.nativeElement.focus();
                        break;
                    case ColumnDisplayType.Date:
                    case ColumnDisplayType.Time:
                    case ColumnDisplayType.DateTime:
                        (<unknown>this.currentCellInput as Calendar).inputfieldViewChild.nativeElement.focus();
                        break;
                }
            }
        }, 100);
    }

    //#region Export logic

    public getExportFilename(): string {

        return "export_" + this.datePipe.transform(new Date(), "yyyyMMdd") + "_" + this.datePipe.transform(new Date(), "HHmm");
    }

    public exportCSV() {

        this.table.exportCSV();
    }

    public exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.dataSource);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "export");
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, this.getExportFilename() + EXCEL_EXTENSION);
        });
    }

    //#endregion
}
