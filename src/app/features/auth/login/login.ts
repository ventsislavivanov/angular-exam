import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../shared/components';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { RequestToken } from '../../../models';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormField,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  faUser = faUser;
  faLock = faLock;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);

  token: string|null = null;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  get emailErrors() {
    const control = this.loginForm.get('email');
    if (control?.touched && control.invalid) {
      return Object.keys(control.errors || {}).map((key, i) => ({
        $uid: i,
        $message: this.getErrorMessage(key, control.errors?.[key])
      }));
    }

    return [];
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    const messages: any = {
      required: 'This field is required',
      email: 'Please enter a valid email',
      minlength: `Minimum length is ${errorValue?.requiredLength}`
    };

    return messages[errorKey] || 'Invalid field';
  }

  get passwordErrors() {
    const control = this.loginForm.get('password');
    if (control?.touched && control.invalid) {
      return Object.keys(control.errors || {}).map((key, i) => ({
        $uid: i,
        $message: this.getErrorMessage(key, control.errors?.[key])
      }));
    }

    return [];
  }

  onSubmit() {
    if (this.loginForm.valid) {


      this.authService.generationRequestToken().subscribe({
        next: (response: RequestToken) => {
          // 1. get token
          const token = response.request_token;

          // 2. confirm app from user
          // alert(`https://www.themoviedb.org/authenticate/${token}`);

          // 3. login in site
          // allow
          // get header Authentication-Callback from response
          // {"success":true,"session_id":"66f767bd2b8684131148af9f1fa55ac55f84369a"}
          const sessionId = 'cf1a055cd7ec689a01348eac08c4dd06e7927892';
          const success = true;
          this.store.dispatch(loginSuccess({ sessionId, success }));

          this.router.navigate(['/dashboard']);
        },
        error: (err: Error) => {
          console.log(err);
        }
      });


    }
  }
}
