import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApplication } from '@application/providers';
import { jwtInterceptor } from '@infrastructure/interceptors/jwt.interceptor';
import { provideInfrastructure } from '@infrastructure/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...provideApplication(),
    ...provideInfrastructure(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};
