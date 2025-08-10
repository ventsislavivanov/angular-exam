import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import {
  faUser,
  faEnvelope,
  faUnlock,
  faUnlockKeyhole,
  faIdCard,
  faPhoneVolume,
  faLocationPin,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { FormField, RadioGroup } from '../../../shared/components';
import { egnValidator, passwordMatchValidator  } from '../../../core/validators';

@Component({
  selector: 'app-sign-up',
  imports: [
    RadioGroup,
    FormField,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faUnlock = faUnlock;
  faUnlockKeyhole = faUnlockKeyhole;
  faIdCard = faIdCard;
  faPhoneVolume = faPhoneVolume;
  faLocationPin = faLocationPin;
  faCalendar = faCalendar;

  genderOptions = ['Male', 'Female', 'Other'];

  private formBuilder = inject(FormBuilder);

  signUpForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    pin: ['', [Validators.required, egnValidator()]],
    dob: [{ value: '', disabled: true }],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    address: ['', Validators.required],
    passwords: this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z0-9]*$/)]
      ],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator() })
  });

  getErrors(controlName: string) {
    const control = this.signUpForm.get(controlName);

    if (control?.touched && control.invalid) {
      return Object.keys(control.errors || {}).map((key, i) => ({
        $uid: i,
        $message: this.getErrorMessage(key, control.errors?.[key])
      }));
    }

    return [];
  }

  getErrorMessage(errorKey: string, errorValue: any) {
    const messages: any = {
      required: 'This field is required',
      email: 'Please enter a valid email',
      pattern: 'Invalid format',
      minlength: `Minimum length is ${errorValue?.requiredLength}`,
      maxlength: `Maximum length is ${errorValue?.requiredLength}`,
      invalidEgn: 'Invalid EGN',
      passwordMismatch: 'Passwords do not match'
    };

    return messages[errorKey] || 'Invalid field';
  }

  onPinChange() {
    const pin = this.signUpForm.get('pin')?.value || '';
    if (pin.length >= 6) {
      this.signUpForm.get('dob')?.setValue(this.extractBirthDate(pin));
    } else {
      this.signUpForm.get('dob')?.setValue('');
    }
  }

  onChangeGender(e: any) {
    this.signUpForm.get('gender')?.setValue(e);
    this.signUpForm.get('gender')?.updateValueAndValidity();
  }

  extractBirthDate(pin: string) {
    let year = pin.substring(0, 2);
    let month: any = pin.substring(2, 4);
    const day = pin.substring(4, 6);

    if (+month >= 40 && +month <= 52) {
      month = +month - 40;
      year = `20${year}`;
    } else if (+month >= 20 && +month <= 32) {
      month = +month - 20;
      year = `18${year}`;
    } else if (+month >= 1 && +month <= 12) {
      month = +month;
      year = `19${year}`;
    }

    if (month <= 9) {
      month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
  }

  onSubmit() {
    console.log('Form data', this.signUpForm.value);
    if (this.signUpForm.valid) {
      // TODO: redirect to login
    }
  }

}
