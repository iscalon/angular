import { effect, Injectable, signal } from '@angular/core';
import { TimeOffRequest, TimeOffType } from '../infrastructure/time-off-request';
import {
  concatMap,
  delay,
  filter,
  from,
  merge,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  toArray,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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

  constructor() {
    effect(() => {
      const selection = this.selectedType();
      if (!selection) {
        localStorage.removeItem('selectedType');
        return;
      }
      localStorage.setItem('selectedType', selection);
    });
  }

  public getRequests(): Observable<TimeOffRequest[]> {
    return of(this.allRequests).pipe(delay(1200));
  }

  public getRequestsByType(type: TimeOffType | null): Observable<TimeOffRequest[]> {
    if (!type) {
      return of(this.allRequests).pipe(delay(500));
    }
    return of(this.allRequests).pipe(
      concatMap(from),
      filter((request: TimeOffRequest) => request.type === type),
      toArray(),
      delay(500)
    );
  }

  private deleteRequest(id: number): Observable<number> {
    this.allRequests = this.allRequests.filter((r) => r.id !== id);
    return of(id);
  }

  private rejectRequest(id: number): Observable<number> {
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

  private approveRequest(id: number): Observable<number> {
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

  private deleteAction$ = new Subject<TimeOffRequest>();
  private rejectAction$ = new Subject<TimeOffRequest>();
  private approveAction$ = new Subject<TimeOffRequest>();

  selectedType = signal<TimeOffType | null>(localStorage.getItem('selectedType') as TimeOffType);

  requests = toSignal(
    merge(
      toObservable(this.selectedType),
      this.deleteAction$.pipe(mergeMap((r) => this.deleteRequest(r.id))),
      this.approveAction$.pipe(mergeMap((r) => this.approveRequest(r.id))),
      this.rejectAction$.pipe(mergeMap((r) => this.rejectRequest(r.id)))
    ).pipe(
      switchMap(() => {
        return this.getRequestsByType(this.selectedType());
      })
    ),
    {
      initialValue: [] as TimeOffRequest[],
    }
  );

  approve(request: TimeOffRequest) {
    this.approveAction$.next(request);
  }

  reject(request: TimeOffRequest) {
    this.rejectAction$.next(request);
  }

  delete(request: TimeOffRequest) {
    this.deleteAction$.next(request);
  }
}
