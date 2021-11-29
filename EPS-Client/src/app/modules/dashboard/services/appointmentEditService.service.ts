import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AppointmentEdit } from '../interfaces/appointmentEdit.Interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEditService {

    constructor() { }

    appointmentEdit: AppointmentEdit;

    setData(appointmentEdit: AppointmentEdit) {

        if (appointmentEdit)
            this.appointmentEdit = { ...appointmentEdit };
        else {
            this.appointmentEdit = {
                id: Guid.create().toString(),
                changed: false,
                isNew: true,
            }
        }
    }
}
