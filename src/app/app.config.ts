import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer, authFeatureKey } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    provideStore({
      [authFeatureKey]: authReducer,
    }),
    provideEffects([AuthEffects]),

    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
