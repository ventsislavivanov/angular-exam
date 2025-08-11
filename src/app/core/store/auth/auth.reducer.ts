import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  success: boolean;
  sessionId: string | null;
}

export const initialState: AuthState = {
  success: false,
  sessionId: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, { sessionId }): AuthState => ({
    ...state,
    success: true,
    sessionId
  })),

  on(AuthActions.logoutSuccess, (state): AuthState => ({
    ...state,
    success: false,
    sessionId: null
  })),

  on(AuthActions.resetAuth, () => initialState)
);
