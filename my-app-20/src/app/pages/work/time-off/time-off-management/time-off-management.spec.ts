import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffManagement } from './time-off-management';

describe('TimeOffManagement', () => {
  let component: TimeOffManagement;
  let fixture: ComponentFixture<TimeOffManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOffManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOffManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
