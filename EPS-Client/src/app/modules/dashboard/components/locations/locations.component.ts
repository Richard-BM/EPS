import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../../services/datastore.service';
import { LocationResponse, LocationService } from '../../../api';
import { AssistentLocationComponent } from '../../../assistant/assistent-location/assistent-location.component';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { DisplayLocation } from '../../interfaces/DisplayLocation.Interface';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(private locationService: LocationService, private translateService: TranslateService
    , public dialogService: DialogService, private dataStoreService: DatastoreService) { }


  public locationOverviewIsLoading = false;
  public locationsColumnDefinitions: ColumnDefinition[] = [];
  public locationDataSource: DisplayLocation[] = [];
  ref: DynamicDialogRef;

  @ViewChild('locationTable') locationTable: TableComponent;

  ngOnInit(): void {
    this.loadLocationDataSource();

    this.dataStoreService.dataChange.subscribe(response => {
      this.loadLocationDataSource();
    });
  }

  public loadLocationDataSource() {
    this.locationOverviewIsLoading = true;

    this.locationService.locationLocationsGet().subscribe(response => {
      this.locationDataSource = [];
      this.locationsColumnDefinitions = [];

      for (let currentLocation of response) {
        this.locationDataSource.push(this.createLocationDisplayObject(currentLocation));
      }

      this.generateLocationGridDefinitions();
      this.locationOverviewIsLoading = false;
    });
  }

  private createLocationDisplayObject(locationResponse: LocationResponse) {
    let displayLocation: DisplayLocation = {
      id: locationResponse.locationId,
      name: locationResponse.name,
      street: locationResponse.street,
      postalcode: locationResponse.postalcode,
      city: locationResponse.city
    };

    return displayLocation;
  }

  public onLocationCreate() {
    this.ref = this.dialogService.open(AssistentLocationComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.LOCATIONCOMPONENT.CREATELOCATION"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onLocationDelete() {
    this.locationOverviewIsLoading = true;

    const locationId = this.locationTable.selectedRow.id;

    this.locationService.locationLocationsLocationIdDelete(this.locationTable.selectedRow.id).subscribe(response => {
      this.dataStoreService.dataChanged(locationId);
      this.locationOverviewIsLoading = false;
    });
  }

  public generateLocationGridDefinitions() {
    this.locationsColumnDefinitions.push(
      {
        header: "Name", field: "name", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
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
      }
    );
  }
}
