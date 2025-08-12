import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectSessionId } from '../../../core/store/auth/auth.selectors';
import { logoutFailure, logoutSuccess } from '../../../core/store/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { catchError, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  links = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'favorite-movies', label: 'Favorites' },
    { path: 'about-us', label: 'About Us' },
    { path: 'contact-us', label: 'Contact Us' },
  ]

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store: Store = inject(Store);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  logout() {
    this.store
      .select(selectSessionId)
      .pipe(
        take(1),
        switchMap((sessionId) => this.authService.deleteSession(sessionId)),
        tap(() => {
          this.store.dispatch(logoutSuccess());
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.store.dispatch(logoutFailure({ error }));
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
}
