export interface TimeOffRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  type: TimeOffType;
  status: TimeOffStatus;
  comment?: string;
}

export type TimeOffType =
  | 'Vacation'
  | 'Sick Leave'
  | 'Maternity Leave'
  | 'Paternity Leave'
  | 'Other';

export type TimeOffStatus = 'Pending' | 'Approved' | 'Rejected';