import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../../services/datastore.service';
import { EditServiceService } from '../../../../services/editService.service';
import { ClientResponse, ClientService } from '../../../api';
import { ClientComponent } from '../../../assistant/client/client.component';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { DisplayClient } from '../../interfaces/DisplayClient.Interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientService, public dialogService: DialogService, private translateService: TranslateService
    , private dataStoreService: DatastoreService, private editService: EditServiceService) { }

  public clientOverviewIsLoading = false;
  public clientColumnDefinitions: ColumnDefinition[] = [];
  public clientDataSource: DisplayClient[] = [];

  ref: DynamicDialogRef;

  @ViewChild('clientTable') clientTable: TableComponent;

  ngOnInit(): void {
    this.loadClientDataSource();


    this.dataStoreService.dataChange.subscribe(response => {
       this.loadClientDataSource();
    });
  }

  public loadClientDataSource() {
    this.clientOverviewIsLoading = true;

    this.clientService.clientClientsGet().subscribe(response => {
      this.clientDataSource = [];
      this.clientColumnDefinitions = [];

      for (let currentClient of response) {
        this.clientDataSource.push(this.createClientDisplayObject(currentClient));
      }

      this.generateClientGridDefinitions();
      this.clientOverviewIsLoading = false;
    });
  }

  private createClientDisplayObject(clientResponse: ClientResponse) {
    let displayClient: DisplayClient = {
      id: clientResponse.clientId,
      name: clientResponse.name
    };

    return displayClient;
  }

  public onClientCreate() {
    this.editService.setClientData(null);

    this.ref = this.dialogService.open(ClientComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.CLIENTCOMPONENT.CREATECLIENT"),
        width: '50%',
        contentStyle: { "max-height": "600px", "overflow": "auto" },
        baseZIndex: 10000
    });
  }

  onClientEdit() {
    this.editService.setClientData(this.clientDataSource.find(x => x.id == this.clientTable.selectedRow.id));
    this.editService.clientEdit.changed = true;

    this.ref = this.dialogService.open(ClientComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.CLIENTCOMPONENT.EDITCLIENT"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  };


  public onClientDelete() {
    this.clientOverviewIsLoading = true;
    const clientId = this.clientTable.selectedRow.id
    this.clientService.clientClientIdDelete(clientId).subscribe(response => {
      this.dataStoreService.dataChanged(clientId);
      this.clientOverviewIsLoading = false;
    });
  }

  public generateClientGridDefinitions() {
    this.clientColumnDefinitions.push(
      {
        header: "Name", field: "name", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: false, width: 150, editable: false, toolTip: null
      }
    );
  }
}
