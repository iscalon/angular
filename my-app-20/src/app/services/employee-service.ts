import { Injectable } from '@angular/core';
import { concatMap, delay, EMPTY, filter, first, from, Observable, of, tap } from 'rxjs';
import { Employee } from '../infrastructure/types/employee';

@Injectable()
export class EmployeeService {
  /**
   *
   * @returns
   */
  getEmployees(): Observable<Employee[]> {
    return of<Employee[]>([
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
      {
        id: 2,
        firstName: 'Jimmy',
        lastName: 'DNEGEL',
        email: 'jimmy.dnegel@example.org',
        position: 'Designer',
        level: 'Junior',
        isAvailable: false,
      },
    ]).pipe(delay(1500));
  }

  /**
   *
   * @param id
   * @returns
   */
  getEmployee(id: number): Observable<Employee> {
    if(id < 0) {
      return EMPTY;
    }
    return this.getEmployees().pipe(
      concatMap(from),
      filter(employee => employee.id === id),
      first()
    );
  }
}
