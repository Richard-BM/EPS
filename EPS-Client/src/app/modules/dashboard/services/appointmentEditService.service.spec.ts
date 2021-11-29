import { TestBed } from '@angular/core/testing';

import { AppointmentEditService } from './appointmentEditService.service';

describe('AppointmentEditServiceService', () => {
  let service: AppointmentEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
