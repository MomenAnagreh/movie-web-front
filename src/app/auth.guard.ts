import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from './app-routing.module';
import { UsersService } from './services/users.service';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
  ) {}

  canActivate(routeerstate?: any) {
    let url = routeerstate._routerState.url; // this url is unactivated route which the user is trying to enter;
    let validRoutes = routes;
    url = url.replace(/\//g, '');
    const isRouteValid =
      validRoutes.findIndex((item) => item.path === url) > -1 ? true : false;
    if (isRouteValid) {
      if (this.isLoggedIn()) {
        if (url === 'login') {
          this.router.navigate(['dashboard']);
        } else {
          return true;
        }
      } else {
        this.router.navigate(['login']);
      }
    } else {
      if (this.isLoggedIn()) {
        // not valid route and logged In
        this.router.navigate(['dashboard']);
      }
    }
    return;
  }

  isLoggedIn() {
    //write your authentication and authorization code and return true or false

    return this.userService.getIsLoggedIn();
  }
}
