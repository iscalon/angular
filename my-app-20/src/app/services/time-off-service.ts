import { Injectable, Optional } from '@angular/core';
import { TimeOffRequest } from '../infrastructure/time-off-request';
import { debounceTime, delay, EMPTY, Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeOffService {
  private allRequests: TimeOffRequest[] = [
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
  ];

  public getRequests(): Observable<TimeOffRequest[]> {
    return of(this.allRequests).pipe(delay(1200));
  }

  public deleteRequest(id: number): Observable<number> {
    this.allRequests = this.allRequests.filter((r) => r.id !== id);
    return of(id);
  }

  public rejectRequest(id: number): Observable<number> {
    const index = this.allRequests.findIndex((r) => r.id === id);
    this.allRequests = this.allRequests.map((item, i) =>
      i === index
        ? ({
            ...item,
            status: 'Rejected',
          } as TimeOffRequest)
        : item
    );
    return of(id);
  }

  public approveRequest(id: number): Observable<number> {
    const index = this.allRequests.findIndex((r) => r.id === id);
    this.allRequests = this.allRequests.map((item, i) =>
      i === index
        ? {
            ...item,
            status: 'Approved',
          }
        : item
    );
    return of(id);
  }
}
