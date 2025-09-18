import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/authentication.interceptor';
import { Limits } from './shared/directives/truncate.directive';
import { employeePermissionsInterceptor } from './shared/interceptors/employee-permissions.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding()
      /*
        if a component has an input property that has the same name as the route parameter ('id' for example)
        then it automatically passes the value into the input
      */
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor, employeePermissionsInterceptor]), withFetch()),
    { provide: Limits, useValue: { truncate: 77 } },
  ],
};
