import { Component, computed, signal } from '@angular/core';
import { TimeOffRequest, TimeOffType } from '../../../../infrastructure/time-off-request';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-off-management',
  imports: [DatePipe, ReactiveFormsModule],
  template: `
    <h2>Time Off Management</h2>
    <h3>Resolved : {{ resolvedRequests().length }} / {{ requests().length }}</h3>
    <div>
      <select [formControl]="formControl" (change)="onTypeChange()">
        <option [ngValue]="null">All</option>
        <option [ngValue]="'Vacation'">Vacation</option>
        <option [ngValue]="'Sick Leave'">Sick Leave</option>
        <option [ngValue]="'Maternity Leave'">Maternity Leave</option>
        <option [ngValue]="'Paternity Leave'">Paternity Leave</option>
        <option [ngValue]="'Other'">Other</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for(request of filteredRequests(); track $index) {
          <tr>
            <td>{{ request.employeeId }}</td>
            <td>{{ request.startDate | date }}</td>
            <td>{{ request.endDate | date }}</td>
            <td>{{ request.type }}</td>
            <td>{{ request.status }}</td>
            <td>{{ request.comment }}</td>
            <td>
              @if(request.status === 'Pending') {
              <button (click)="approveRequest(request)">Approve</button>
              <button (click)="rejectRequest(request)">Reject</button>
              }
              <button (click)="deleteRequest(request)">Delete</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class TimeOffManagement {
  requests = signal<TimeOffRequest[]>([
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
  ]);

  formControl = new FormControl<TimeOffType | null>(null);

  resolvedRequests = computed(() => this.requests().filter((r) => r.status !== 'Pending'));

  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter((r) => (type ? r.type === type : true));
  });

  selectedType = signal<TimeOffType | null>(null);

  approveRequest(request: TimeOffRequest): void {
    this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index
          ? {
              ...item,
              status: 'Approved',
            }
          : item
      );
    });
  }

  rejectRequest(request: TimeOffRequest): void {
    this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index
          ? ({
              ...item,
              status: 'Rejected',
            } as TimeOffRequest)
          : item
      );
    });
  }

  deleteRequest(request: TimeOffRequest): void {
    this.requests.update((requests) => requests.filter((r) => r.id !== request.id));
  }

  onTypeChange(): void {
    this.selectedType.set(this.formControl.value);
  }
}
