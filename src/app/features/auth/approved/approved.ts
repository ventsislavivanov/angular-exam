import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services';
import { loginSuccess } from '../../../core/store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-approved',
  template: ``,
})
export class ApprovedComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit() {
    const requestToken = this.route.snapshot.queryParamMap.get('request_token');
    if (requestToken) {
      this.authService.createSession(requestToken).subscribe((response: any) => {
        const { session_id, success } = response;
        this.store.dispatch(loginSuccess({ sessionId: session_id, success }));
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
