import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../shared/components';
import { AuthService } from '../../../core/services';
import { RequestToken } from '../../../models';
import {RouterLink} from '@angular/router';

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

  usernameValue: string = 'vivanovspam';
  passwordValue: string = 'eUXz5@Zn#0';

  loginForm: FormGroup = this.formBuilder.group({
    username: [this.usernameValue, [Validators.required]],
    password: [this.passwordValue, [Validators.required, Validators.minLength(3)]],
  });

  get usernameErrors() {
    const control = this.loginForm.get('username');
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
      username: 'Please enter a valid username',
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
          const token = response.request_token;
          window.location.href = this.authService.buildAuthUrl(token);
        },
        error: (err: Error) => {
          console.log(err);
        }
      });
    }
  }
}
