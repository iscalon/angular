import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Employee } from '../../../infrastructure/types/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  template: `
    <h2>Employee Details</h2>
    @if(employee$ | async; as employee) {
      <div>
        <label>First Name: </label>{{ employee.firstName }}<br/>
        <label>Last Name: </label>{{ employee.lastName }}<br/>
        <label>Position: </label>{{ employee.position }}<br/>
      </div>
    }
  `,
  styles: ``,
})
export class EmployeeDetails {
  employee$: Observable<Employee> = inject(ActivatedRoute).data.pipe(map(data => data['employee']));
}
