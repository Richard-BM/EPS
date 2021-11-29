import { Component, OnInit } from '@angular/core';
import { ClientResponse, ClientsService, ProjectResponse, ProjectsService } from '../../../api';
import { AppointmentGeneralService } from '../../services/appointmentGeneralService.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    constructor(private clientsService: ClientsService, private projectsService: ProjectsService
        , private appointmentGeneralService: AppointmentGeneralService) { }

    public overviewIsLoading = true;
    private clients: ClientResponse[] = [];
    private selectedClients: ClientResponse[] = [];

    public filterableProjects: ProjectResponse[] = [];
    public selectedProjects: ProjectResponse[] = [];


    ngOnInit(): void {
        this.overviewIsLoading = true;
        this.setClientsFilter();
  }


    private setClientsFilter() {
        this.clientsService.clientsGet().subscribe(response => {
            this.clients = response.sort((a, b) => a.name.localeCompare(b.name));
            this.selectedClients = this.clients;

            this.projectsService.projectsGet(true).subscribe(response => {
                this.appointmentGeneralService.projects = response,
                this.setProjectsFilterByClients();
            });
        });
    }

    private setProjectsFilterByClients() {

        this.filterableProjects = this.appointmentGeneralService.projects.filter(project => this.selectedClients.findIndex(client => client.id == project.parentId) > -1)
            .sort((a, b) => a.name.localeCompare(b.name))

        this.overviewIsLoading = false;
    }

    public onFilter(event: MouseEvent) {
        this.appointmentGeneralService.selectedProjects = this.selectedProjects;
        this.appointmentGeneralService.emitAppointmentFilterEvent(event);
    }
}
