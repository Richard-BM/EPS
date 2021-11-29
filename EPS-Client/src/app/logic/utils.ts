import { AppointmentStatusResponse } from '../modules/api';


export function currentAppointmentStatusGet(appointmentStatusList: AppointmentStatusResponse[]): AppointmentStatusResponse {
    if (appointmentStatusList && appointmentStatusList.length > 0) {

        let sortedAppointmentStatus = appointmentStatusList.sort(function (a, b) {
            return new Date(b.stated).getTime() - new Date(a.stated).getTime();
        });

        return sortedAppointmentStatus[0];
    }
    else
        return null;
}