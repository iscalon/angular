import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffManagement } from './time-off-management';
import { TimeOffRequest } from '../../../../infrastructure/time-off-request';
import { TimeOffService } from '../../../../services/time-off-service';

describe('TimeOffManagement', () => {
  const allRequests: TimeOffRequest[] = [
    {
      id: 1,
      employeeId: 1,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Vacation',
      status: 'Pending',
    },
    {
      id: 2,
      employeeId: 2,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Sick Leave',
      status: 'Approved',
      comment: 'Feeling pretty sick today :(',
    },
    {
      id: 3,
      employeeId: 3,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      type: 'Maternity Leave',
      status: 'Pending',
      comment: 'Baby is coming',
    },
  ];

  let component: TimeOffManagement;
  let fixture: ComponentFixture<TimeOffManagement>;
  let service: TimeOffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOffManagement],
      providers: [TimeOffService],
    }).compileComponents();

    service = TestBed.inject(TimeOffService);
    spyOn(service, 'getAllRequests').and.returnValue(allRequests); // juste cette méthode est mockée

    fixture = TestBed.createComponent(TimeOffManagement);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Time Off Management');
    // expect(compiled.querySelector('h3')?.textContent).toContain('Resolved : 1 / 3');
    expect(service.getAllRequests).toHaveBeenCalled();
  });
});
