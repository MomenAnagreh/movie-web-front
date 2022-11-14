import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const { role } = this.authService.userValue;
    if (role === 'ADMIN' || role === 'SUPERUSER') {
      return of(true);
    } else {
      alert(
        "User can only access this page if the user role is 'ADMIN' or 'SUPERUSER'. Change your role"
      );
      this.router.navigate(['movies/user']);
    }
    return of(false);
  }
}
