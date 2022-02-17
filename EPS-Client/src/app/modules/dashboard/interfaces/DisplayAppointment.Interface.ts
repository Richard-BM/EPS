export interface DisplayAppointment {
  id: string,
  workerName?: string,
  locationName?: string,
  street?: string,
  postalcode?: string,
  city?: string
  timeFrom?: string,
  timeTo?: string

  changed?: boolean;
  isNew?: boolean;
}
