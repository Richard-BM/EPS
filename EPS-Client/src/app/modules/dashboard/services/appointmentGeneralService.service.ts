import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectResponse } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AppointmentGeneralService {

    constructor() { }

    public appointmentFilterRequestEvent = new Subject<Event>();
    public projects: ProjectResponse[] = []
    public selectedProjects: ProjectResponse[] = []

    emitAppointmentFilterEvent(event: Event) {
        this.appointmentFilterRequestEvent.next(event);
    }
}
