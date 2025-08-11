import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services';
import { Store } from '@ngrx/store';
import { selectSessionId } from './auth.selectors';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutRequested),
      withLatestFrom(this.store.select(selectSessionId)),
      switchMap(([_, sessionId]) =>
        this.authService.deleteSession(sessionId).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );
}
