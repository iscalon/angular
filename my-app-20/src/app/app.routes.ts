import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { EmployeeService } from './services/employee-service';
import { hasPermission } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'registration',
    loadComponent: async () => {
      const module = await import('./pages/registration/registration');
      return module.Registration;
    },
  },
  {
    path: 'employees',
    loadChildren: async () => {
      const module = await import('./pages/employees/employees.routes');
      return module.routes;
    },
    providers: [EmployeeService],
    canActivate: [hasPermission('ListEmployees')]
  },
];
