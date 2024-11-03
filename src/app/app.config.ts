import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideApplication } from '@application/providers';
import { provideInfrastructureMock } from '@infrastructure/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...provideApplication(),
    ...provideInfrastructureMock(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
