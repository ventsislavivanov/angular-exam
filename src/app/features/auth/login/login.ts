import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../shared/components';
import { Router, RouterLink } from '@angular/router';

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

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

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
      console.log('Form data', this.loginForm.value);
      // TODO: login logic with service
    }
  }
}
