import { StatusType } from "../../../enums/statusType.enum";

export interface DisplayAppointment {
    id: string,
    projectName: string,
    date: Date,
    timeFrom: Date
    timeTo: Date,
    appointmentStatusName: string,
    requestedContractorName?: string,
    locationName: string,
    locationStreet: string,
    locationPostalcode: string,
    locationCity: string,

    //Fields that are not displayed and are used for logic
    appointmentStatusType: StatusType
}