import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatastoreService } from '../../../../services/datastore.service';
import { ClientService, ProjectResponse, ProjectService } from '../../../api';
import { AssistentProjectComponent } from '../../../assistant/assistent-project/assistent-project.component';
import { TableComponent } from '../../../commonUi/components/table/table.component';
import { ColumnDisplayType } from '../../../commonUi/enums/columnDisplayType.enum';
import { ColumnFilterType } from '../../../commonUi/enums/columnFilterType.enum';
import { ColumnDefinition } from '../../../commonUi/interfaces/columnDefinition.interface';
import { DisplayProjects } from '../../interfaces/DisplayProjects.Interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private clientService: ClientService, private projectService: ProjectService, private translateService: TranslateService
    , public dialogService: DialogService, private dataStoreService: DatastoreService) { }

  @ViewChild('projectTable') projectTable: TableComponent;

  public projectOverviewIsLoading = false;
  public projectsColumnDefinitions: ColumnDefinition[] = [];
  public projectDataSource: DisplayProjects[] = [];
  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.loadProjectDataSource();

    this.dataStoreService.dataChange.subscribe(response => {
      this.loadAppointmentDataSource();
    });
  }

  public loadProjectDataSource() {
    this.projectOverviewIsLoading = true;

    this.projectService.projectProjectsGet().subscribe(response => {
      this.projectsColumnDefinitions = [];
      this.projectDataSource = [];

      for (let currentProject of response) {
        this.projectDataSource.push(this.createProjectDisplayObject(currentProject));
      }

      this.generateLocationGridDefinitions();
      this.projectOverviewIsLoading = false;
    });
  }

  private createProjectDisplayObject(projectResponse: ProjectResponse) {
    let displayProject: DisplayProjects = {
      id: projectResponse.projectId,
      clientName: projectResponse.clientResponse?.name,
      name: projectResponse.projectName,
      number: projectResponse.projectNumber,
      description: projectResponse.projectDescription
    };

    return displayProject;
  }

  public onProjectCreate() {
    this.ref = this.dialogService.open(AssistentProjectComponent, {
      header: this.translateService.instant("DASHBOARDMODULE.PROJECTCOMPONENT.CREATEPROJECT"),
      width: '50%',
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  public onProjectDelete() {
    this.projectOverviewIsLoading = true;

    const projectId = this.projectTable.selectedRow.id;

    this.projectService.projectProjectProjectIdDelete(projectId).subscribe(response => {
      this.dataStoreService.dataChanged(projectId);
      this.projectOverviewIsLoading = false;
    });
  }

  public generateLocationGridDefinitions() {
    this.projectsColumnDefinitions.push(
      {
        header: "Kunde", field: "clientName", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Name", field: "name", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Nr. ", field: "number", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      },
      {
        header: "Beschreibung", field: "description", displayType: ColumnDisplayType.String, filterType: ColumnFilterType.String,
        center: true, width: 150, editable: false, toolTip: null
      }
    );
  }
}
