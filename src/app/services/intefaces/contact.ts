import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Movie } from './movies';

export interface User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  color?: string;
  wishlist?: string[];
  role?: string;
  jwtToken?: string;
}

export interface UserLogin {
  email: any;
  password: any;
}

export interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

export enum Roles {
  USER,
  ADMIN,
  SUPERUSER,
}

export interface AuthDto {
  accessToken: string;
  role: string;
}
