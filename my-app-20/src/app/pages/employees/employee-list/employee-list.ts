import { Component, inject, Type } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';


@Component({
  selector: 'employee-list',
  imports: [AsyncPipe, NgComponentOutlet],
  template: `
    <h2>Employee List</h2>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (employee of employees$ | async; track $index) {
        <tr>
          <td>{{ employee.firstName }} {{ employee.lastName }}</td>
          <td>{{ employee.position }}</td>
          <td>
            <button (click)="showConfirmationDialog()">Delete</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
    <ng-container *ngComponentOutlet="confirmDialog"></ng-container>
  `,
  styles: ``,
})
export class EmployeeList {
  private readonly employeeService = inject(EmployeeService);

  isConfirmationOpen = false;
  confirmDialog: Type<ConfirmationDialog> | null = null;

  employees$ = this.employeeService.getEmployees();

  async showConfirmationDialog() {
    this.confirmDialog = await import(
      '../../../shared/components/confirmation-dialog/confirmation-dialog'
    ).then((module) => module.ConfirmationDialog);
    this.isConfirmationOpen = true;
  }
}
