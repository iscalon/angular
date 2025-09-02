import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeeService {
  getEmployees(): Observable<Employee[]> {
    return of([{
      firstName: 'Toto',
      lastName: 'John',
      position: 'Noob'
    }]);
  }
}

export interface Employee {
  firstName: string;
  lastName: string;
  position: string;
}
