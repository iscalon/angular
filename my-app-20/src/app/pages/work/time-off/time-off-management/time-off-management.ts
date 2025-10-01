import { Component, computed, effect, inject, Injector } from '@angular/core';
import { TimeOffRequest, TimeOffType } from '../../../../infrastructure/time-off-request';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TimeOffService } from '../../../../services/time-off-service';

@Component({
  selector: 'app-time-off-management',
  imports: [DatePipe, ReactiveFormsModule],
  template: `
    <h2>Time Off Management</h2>
    <h3>Resolved : {{ resolvedRequests().length }} / {{ this.timeOffRequestService.requests().length }}</h3>
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
  readonly timeOffRequestService = inject(TimeOffService);

  formControl = new FormControl<TimeOffType | null>(this.timeOffRequestService.selectedType());

  resolvedRequests = computed(() =>
    this.timeOffRequestService.requests().filter((r) => r.status !== 'Pending')
  );

  filteredRequests = computed(() => {
    const type = this.timeOffRequestService.selectedType();
    return this.timeOffRequestService.requests().filter((r) => (type ? r.type === type : true));
  });

  private readonly injector = inject(Injector);

  constructor() {
    this.someMethodForEffect();
  }

  /**
   * Si on veut créer un effet en dehors d'un contexte où l'arbre d'injection de dépendances
   * est existant, alors on peut passer une référence à l'injecteur du composant actuel.
   */
  private someMethodForEffect() {
    effect(
      () => {
        console.log(`Time-off résolus : ${JSON.stringify(this.resolvedRequests())}`);
      },
      { injector: this.injector }
    );
  }

  approveRequest(request: TimeOffRequest): void {
    this.timeOffRequestService.approve(request);
  }

  rejectRequest(request: TimeOffRequest): void {
    this.timeOffRequestService.reject(request);
  }

  deleteRequest(request: TimeOffRequest): void {
    this.timeOffRequestService.delete(request);
  }

  onTypeChange(): void {
    this.timeOffRequestService.selectedType.set(this.formControl.value);
  }
}
