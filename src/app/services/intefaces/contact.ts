import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface User {
  username?: string;
  email?: string;
  password?: any;
  role?: string;
  selected?: boolean;
  color?: string;
}

export interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

export enum Roles {
  User,
  Admin,
  Super,
}
