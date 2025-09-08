import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);

  isAuthenticated$ = new BehaviorSubject(false);

  login(credentials: { email: string; password: string }): Observable<unknown> {
    console.log(`${credentials.email} - ${credentials.password}`);
    return this.http
      .post('/api/auth/login', credentials)
      .pipe(tap(() => this.isAuthenticated$.next(true)));
  }

  logout(): Observable<unknown> {
    console.log('Logout !');
    return this.http
      .post('/api/auth/logout', {})
      .pipe(tap(() => this.isAuthenticated$.next(false)));
  }

  getAuthenticationToken(): string {
    return 'xxxx-token-yyyyyyy-zzzzzz';
  }
}

export function isAuthenticated$(): Observable<boolean> {
  const authService = inject(Auth);
  return authService.isAuthenticated$.asObservable();
}
