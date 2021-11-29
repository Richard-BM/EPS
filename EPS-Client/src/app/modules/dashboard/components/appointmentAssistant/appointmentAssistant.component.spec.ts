import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAssistantComponent } from './appointmentAssistant.component';

describe('AppointmentAssistantComponent', () => {
  let component: AppointmentAssistantComponent;
  let fixture: ComponentFixture<AppointmentAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAssistantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
