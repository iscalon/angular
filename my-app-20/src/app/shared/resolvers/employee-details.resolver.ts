import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Employee } from '../../infrastructure/types/employee';
import { EmployeeService } from '../../services/employee-service';

export const employeeDetailsResolver: ResolveFn<Employee> = (route: ActivatedRouteSnapshot) => {
  const employeeService = inject(EmployeeService);
  const id = +(route.paramMap.get('id') ?? -1);

  return employeeService.getEmployee(id);
};
