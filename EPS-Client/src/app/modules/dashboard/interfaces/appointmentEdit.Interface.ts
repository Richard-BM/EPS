export interface AppointmentEdit {
    id: string,
    date?: Date,
    plannedFrom?: Date,
    plannedTo?: Date,
    timeFrom?: Date
    timeTo?: Date,
    appointmentStatusName?: string,
    personName?: string,
    requestedContractorName?: string,
    activityId?: string,
    locationId?: string,
    locationName?: string,
    locationStreet?: string,
    locationPostalcode?: string,
    locationCity?: string,
    changed: boolean,
    isNew: boolean,
}