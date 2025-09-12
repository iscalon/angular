import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProject } from './internal-project';

describe('InternalProject', () => {
  let component: InternalProject;
  let fixture: ComponentFixture<InternalProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
