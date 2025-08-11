import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ success: boolean, sessionId: string }>()
);

export const resetAuth = createAction('[Auth] Reset');

export const logoutRequested = createAction('[Auth] Logout Requested');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);
