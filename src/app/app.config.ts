import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DATA, DATA_TOKEN } from './data';
import { of } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: APP_BASE_HREF, useValue: '/market-test' },
    { provide: LOCALE_ID, useValue: 'uk' },
    {
      provide: DATA_TOKEN,
      useValue: of(DATA),
    }
  ]
};
