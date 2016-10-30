import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    switch (state.url) {

      case '/admin': {

        if (this.authService.isLoggedIn()) {
          return true;
        }
        else {
          this.router.navigate(['signin']);
          return false;
        }

      }

      case '/signin': {

        if (this.authService.isLoggedIn()) {
          this.router.navigate(['admin']);
          return false;
        }
        else {
          return true;
        }

      }

      default: {

        if (this.authService.isLoggedIn()) {
          return true;
        }
        else {
          this.router.navigate(['signin']);
          return false;
        }

      }

    }

  }

}
