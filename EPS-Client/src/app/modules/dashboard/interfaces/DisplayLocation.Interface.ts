export interface DisplayLocation {
  id: string,
  name?: string,
  street?: string,
  postalcode?: string,
  city?: string;

  changed?: boolean;
  isNew?: boolean;
}
