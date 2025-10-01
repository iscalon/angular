import { Component, inject, signal } from '@angular/core';
import { NotificationService } from '../../../services/notification-service';
import { Notification } from '../../../infrastructure/types/notification';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header>
      <h2>HRMS</h2>
      <button (click)="notificationsOpen.set(true)" title="View Notifications">
        You have {{ unreadNotifications().length }} unread notifications
      </button>
    </header>
    <dialog [open]="notificationsOpen()">
      <h3>Notifications</h3>
      <ul>
        @for(notification of notifications(); track $index) {
          <li>
            <h4>{{ notification.title }}</h4>
            <span>{{ notification.message }}</span>
            @if(!notification.read) {
              <button (click)="markAsRead(notification)">Mark as Read</button>
            }
          </li>
        }
      </ul>
      <button (click)="notificationsOpen.set(false)">Close</button>
    </dialog>
  `,
  styles: ``,
})
export class Header {
  private readonly notificationService = inject(NotificationService);

  notifications = this.notificationService.allNotifications;

  unreadNotifications = this.notificationService.unreadNotifications;
  notificationsOpen = signal(false);

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification);
  }

  constructor() {
    this.notificationService.connect();
  }
}
