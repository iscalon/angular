import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Auth } from '../../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((isAuth) => isAuth || router.createUrlTree(['/login']))
  );
};

export function hasPermission(permissionName: string): CanActivateFn {
  return () => {
    const authService = inject(Auth);
    const router = inject(Router);

    return authService.isAuthenticated$.pipe(
      tap((_) => console.log(`Test de la permission : ${permissionName}`)),
      map(
        (isAuth) =>
          (isAuth && authService.hasPermission(permissionName)) || router.createUrlTree(['/login'])
      )
    );
  };
}
