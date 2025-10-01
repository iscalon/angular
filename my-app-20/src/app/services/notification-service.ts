import { computed, effect, Injectable, signal } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  static readonly DEFAULT_NOTIFICATIONS: Notification[] = [
    {
      id: 1,
      date: new Date().toISOString(),
      message: 'Hello',
      read: false,
      title: 'Notification #1',
      type: 'Maintenance'
    },
    {
      id: 2,
      date: new Date().toISOString(),
      message: 'It is',
      read: false,
      title: 'Notification #2',
      type: 'Other'
    },
    {
      id: 3,
      date: new Date().toISOString(),
      message: 'Me',
      read: false,
      title: 'Notification #3',
      type: 'TimeOff'
    }
  ];

  #notifications = signal<Notification[]>(initSignal(localStorage.getItem('notifications')));
  notifications = this.#notifications.asReadonly();
  readNotifications = computed(() => this.#notifications().filter((n) => n.read));
  unreadNotifications = computed(() => this.#notifications().filter((n) => !n.read));

  constructor() {
    effect(() => {
      localStorage.setItem('notifications', JSON.stringify(this.#notifications()));
    });
  }

  addNotification(notification: Notification) {
    this.#notifications.update((notifications) => [...notifications, notification]);
  }

  markAsRead(notification: Notification) {
    this.#notifications.update((notifications) =>
      notifications.map((n) =>
        n.id === notification.id
          ? {
              ...n,
              read: true,
            }
          : n
      )
    );
  }

  markAllAsRead() {
    this.#notifications.update((notifications) =>
      notifications.map((n) => ({
        ...n,
        read: true,
      }))
    );
  }
}

function initSignal(notificationsProperty: string | null): Notification[] {
  if (!notificationsProperty) {
    return NotificationService.DEFAULT_NOTIFICATIONS;
  }
  return JSON.parse(notificationsProperty) as Notification[];
}
