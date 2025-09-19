import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Auth } from '../../services/auth';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((isAuth) => isAuth || router.createUrlTree(['/login']))
  );
};

export function hasPermission(permission: Permission): CanActivateFn {
  return () => {
    const authService = inject(Auth);
    const router = inject(Router);

    return authService.isAuthenticated$.pipe(
      log(`Test de la permission : ${permission}, est authentifié`),
      mergeMap((auth) => 
        authService.hasPermission(permission)
              .pipe(map((perm) => [auth, perm]))),
      map(([auth, perm]) => (perm && auth) || router.createUrlTree(['/login']))
    );
  };
}

function log<T>(message = ''): MonoTypeOperatorFunction<T> {
  return pipe(tap((item) => console.log(`${message ? message + ' : ' : ''}${item}`)));
}

export type Permission = 'ListEmployees' | 'CreateEmployee' | 'DeleteEmployee' | 'EditEmployee';

export function hasPermissions<T>(
  permissions: Permission[],
  permissionsService = inject(Auth)
): MonoTypeOperatorFunction<T> {
  return pipe(
    withLatestFrom(permissionsService.hasPermission(...permissions)), // Donnne une paire <valeur de l'observable source, dernière valeur émise de l'observable retourné par le service des permissions>
    filter(([/* on ignore la valeur de l'observable source */, isAllowed]) => isAllowed),
    map(([value]) => {
      console.log('OK, permission présente');
      return value;
    }) // Si on a passé le filtre alors on envoie la valeur source telle quelle.
  );
}
