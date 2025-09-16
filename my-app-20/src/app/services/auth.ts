import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);

  isAuthenticated$ = new BehaviorSubject(false);

  login(credentials: { email: string; password: string }): Observable<unknown> {
    console.log(`Login ${credentials.email} - ${credentials.password}`);
    this.isAuthenticated$.next(true);
    return this.http
      .post('/api/auth/login', credentials);
  }

  logout(): Observable<unknown> {
    console.log('Logout !');
    this.isAuthenticated$.next(false);
    return this.http
      .post('/api/auth/logout', {});
  }

  getAuthenticationToken(): string {
    return 'xxxx-token-yyyyyyy-zzzzzz';
  }

  hasPermission(permission: string): boolean {
    return 'ListEmployees' === permission;
  }
}

export function isAuthenticated$(): Observable<boolean> {
  const authService = inject(Auth);
  return authService.isAuthenticated$.asObservable();
}
