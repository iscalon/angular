  import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Employee } from '../../../infrastructure/types/employee';
import { CommonModule } from '@angular/common';
import { TruncateDirective } from "../../../shared/directives/truncate.directive";

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, TruncateDirective],
  template: `
    <h2>Employee Details</h2>
    @if(employee$ | async; as employee) {
      <table>
        <tr>
          <td>First Name: </td><td>{{ employee.firstName }}</td>
        </tr>
        <tr>
          <td>Last Name: </td><td appTruncate [limit]="1">{{ employee.lastName }}</td>
        </tr>
        <tr>
          <td>Position: </td><td appTruncate>{{ employee.position }}</td>
        </tr>  
    </table>
    }
  `,
  styles: ``,
})
export class EmployeeDetails {
  employee$: Observable<Employee> = inject(ActivatedRoute).data.pipe(map(data => data['employee']));
}
