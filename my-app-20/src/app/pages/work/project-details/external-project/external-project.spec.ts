import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProject } from './external-project';

describe('ExternalProject', () => {
  let component: ExternalProject;
  let fixture: ComponentFixture<ExternalProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
