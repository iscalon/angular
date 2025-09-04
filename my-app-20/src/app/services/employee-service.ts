import { Injectable } from '@angular/core';
import { concatMap, filter, first, from, Observable, of } from 'rxjs';
import { Employee } from '../infrastructure/types/employee';

@Injectable()
export class EmployeeService {
  /**
   *
   * @returns
   */
  getEmployees(): Observable<Employee[]> {
    return of([
      {
        id: 0,
        firstName: 'John',
        lastName: 'DOE',
        email: 'john.doe@example.org',
        position: 'Developer',
        level: 'Middle',
        isAvailable: true,
      },
      {
        id: 1,
        firstName: 'Coco',
        lastName: 'KAYN',
        email: 'coco.kayn@example.org',
        position: 'Manager',
        level: 'Senior',
        isAvailable: true,
      },
    ]);
  }

  /**
   *
   * @param id
   * @returns
   */
  getEmployee(id: number): Observable<Employee> {
    if(id < 0) {
      return of();
    }
    return this.getEmployees().pipe(
      concatMap(from),
      filter(employee => employee.id === id),
      first()
    );
  }
}
