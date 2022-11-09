import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Movie } from './movies';

export interface User {
  username?: string;
  email?: string;
  password?: any;
  role?: string;
  selected?: boolean;
  color?: string;
  wishlist?: Movie[];
}

export interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

export enum Roles {
  User,
  Admin,
  Super,
}
