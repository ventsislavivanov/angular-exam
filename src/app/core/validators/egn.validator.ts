import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function egnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const egn = control.value;

    if (egn === null || egn === '') {
      return null;
    }

    const helpNumbers = [2, 4, 8, 5, 10, 9, 7, 3, 6];

    if (egn.length !== 10) {
      return { invalidEgn: true };
    }

    let year = parseInt(egn.slice(0, 2), 10);
    let month = parseInt(egn.slice(2, 4), 10);
    let day = parseInt(egn.slice(4, 6), 10);

    if (month > 40) {
      if (!checkDate(month - 40, day, year + 2000)) return { invalidEgn: true };
    } else if (month > 20) {
      if (!checkDate(month - 20, day, year + 1800)) return { invalidEgn: true };
    } else {
      if (!checkDate(month, day, year + 1900)) return { invalidEgn: true };
    }

    const checksum = parseInt(egn.slice(9, 10), 10);
    let egnSum = 0;
    for (let i = 0; i < 9; i++) {
      egnSum += parseInt(egn.slice(i, i + 1), 10) * helpNumbers[i];
    }

    let validCheckSum = egnSum % 11;
    if (validCheckSum === 10) {
      validCheckSum = 0;
    }

    if (checksum !== validCheckSum) {
      return { invalidEgn: true };
    }

    if (month === 0 || (month >= 13 && month <= 20) || (month >= 33 && month <= 40) || (month >= 53 && month <= 99)) {
      return { invalidEgn: true };
    }

    let nFebDays = (((year % 4) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28;
    let nMonthDays = [0, 31, nFebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let now = new Date();
    let birthDate = new Date(year, month - 1, day);

    if (day === 0 || day > nMonthDays[month]) {
      return { invalidEgn: true };
    }

    if ((month > 20 && month < 33) || (month > 40 && month < 53)) {
      if (birthDate.getTime() > now.getTime()) {
        return { invalidEgn: true };
      }
    }

    return null;
  };
}

function checkDate(month: number, day: number, year: number): boolean {
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && (d.getMonth() + 1) === month && d.getDate() === day;
}
