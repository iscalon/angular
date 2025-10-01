export interface Notification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    date: string;
}

export type NotificationType =  'TimeOff' | 'Birthday' | 'Maintenance' | 'Other';