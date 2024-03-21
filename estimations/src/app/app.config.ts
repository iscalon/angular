import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ExpectationService } from './services/expectation-service';
import { ExpectationComputerService } from './services/expectation-computer.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
  {
    provide: ExpectationService,
    useClass: ExpectationComputerService
  }
  ]
};
