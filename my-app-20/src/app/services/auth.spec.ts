import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth, provideHttpClient(), provideHttpClientTesting()],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the user is', () => {
    service.login({ email: 'test', password: 'test' }).subscribe((response) => {
      expect(response).toBeNull();
      expect(service.isAuthenticated$.getValue()).toBe(true);
    });

    const request = httpMock.expectOne({
      url: '/api/auth/login',
    });

    request.flush(null);
  });
});
