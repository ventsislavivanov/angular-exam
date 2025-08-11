import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectSuccess = createSelector(selectAuthState, s => s.success);
export const selectSessionId = createSelector(selectAuthState, s => s.sessionId);
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  s => s.success && !!s.sessionId
);
