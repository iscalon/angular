import { Injectable } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  static readonly DEFAULT_NOTIFICATIONS: Notification[] = [
    {
      id: 1,
      date: new Date().toISOString(),
      message: 'Hello',
      read: false,
      title: 'Notification #1',
      type: 'Maintenance',
    },
    {
      id: 2,
      date: new Date().toISOString(),
      message: 'It is',
      read: false,
      title: 'Notification #2',
      type: 'Other',
    },
    {
      id: 3,
      date: new Date().toISOString(),
      message: 'Me',
      read: false,
      title: 'Notification #3',
      type: 'TimeOff',
    },
  ];

  readonly notifications$: Observable<Notification[]> = new BehaviorSubject(
    SocketService.DEFAULT_NOTIFICATIONS
  ).asObservable().pipe(delay(600));
}

export function initSignal(notificationsJson: string | null): Notification[] {
  if (!notificationsJson) {
    return SocketService.DEFAULT_NOTIFICATIONS;
  }
  return JSON.parse(notificationsJson) as Notification[];
}
