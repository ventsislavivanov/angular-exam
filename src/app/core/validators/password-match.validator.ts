import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string = 'password',
  confirmKey: string = 'confirmPassword'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);

    if (!password || !confirm) {
      return null;
    }

    const mismatch = password.value !== confirm.value;
    const existing = confirm.errors || {};

    if (mismatch) {
      if (!existing['passwordMismatch']) {
        confirm.setErrors({ ...existing, passwordMismatch: true });
      }
    } else {
      if (existing['passwordMismatch']) {
        const { passwordMismatch, ...rest } = existing as any;
        confirm.setErrors(Object.keys(rest).length ? rest : null);
      }
    }

    return mismatch ? { passwordMismatch: true } : null;
  };
}
