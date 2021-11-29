import { TestBed } from '@angular/core/testing';

import { AppointmentGeneralService } from './appointmentGeneralService.service';

describe('AppointmentGeneralServiceService', () => {
  let service: AppointmentGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
