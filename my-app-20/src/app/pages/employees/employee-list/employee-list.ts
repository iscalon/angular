import { Component, inject, OnInit, Type } from '@angular/core';
import { EmployeeService } from '../../../services/employee-service';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { LoaderDirective } from '../../../shared/directives/loader';
import { RouterLink } from '@angular/router';
import { EmployeeAvailability } from '../../../shared/directives/employee-availability';

@Component({
  selector: 'employee-list',
  imports: [AsyncPipe, NgComponentOutlet, LoaderDirective, RouterLink, EmployeeAvailability],
  template: `
    <h2>Employee List</h2>
    <table>
      <thead *loading="loading">
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
            <span><a [routerLink]="['/employees/details', employee.id]">Go to employee</a></span>
            <span><button (click)="showConfirmationDialog()">Delete</button></span>
          </td>
        </tr>
        }
      </tbody>
    </table>
    <ng-container *ngComponentOutlet="confirmDialog"></ng-container>
  `,
  styles: `
    span {
      padding-right: 4px;
    }
    a.not-available:hover {
      color: red;
    }
    `,
})
export class EmployeeList implements OnInit {
  private readonly employeeService = inject(EmployeeService);

  isConfirmationOpen = false;
  confirmDialog: Type<ConfirmationDialog> | null = null;

  loading = true;

  employees$ = this.employeeService.getEmployees();

  ngOnInit(): void {
    this.employees$.subscribe((_) => (this.loading = false));
  }

  async showConfirmationDialog() {
    this.confirmDialog = await import(
      '../../../shared/components/confirmation-dialog/confirmation-dialog'
    ).then((module) => module.ConfirmationDialog);
    this.isConfirmationOpen = true;
  }
}
