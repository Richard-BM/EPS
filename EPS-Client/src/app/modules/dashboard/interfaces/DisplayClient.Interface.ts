export interface DisplayClient {
  id: string,
  name?: string,

  changed?: boolean;
  isNew?: boolean;
}
