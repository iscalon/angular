import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';
import { initSignal, SocketService } from './socket-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly socketService = inject(SocketService);

  #notifications = signal<Notification[]>(initSignal(localStorage.getItem('notifications')));
  allNotifications = this.#notifications.asReadonly();
  readNotifications = computed(() => this.#notifications().filter((n) => n.read));
  unreadNotifications = computed(() => this.#notifications().filter((n) => !n.read));

  constructor() {
    effect(() => {
      localStorage.setItem('notifications', JSON.stringify(this.#notifications()));
    });
  }

  connect() {
    return this.socketService.notifications$
      .pipe(takeUntilDestroyed())
      .subscribe((notifications) => {
        this.#notifications.set(notifications);
      });
  }

  addNotification(notification: Notification) {
    this.#notifications.update((notifications: Notification[]) => [...notifications, notification]);
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
