import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Check if the user is logged in
    const isLoggedIn = this.authService.isLoggedIn();

    // If the user is logged in, prevent access to the admin login page
    if (state.url.startsWith('/admin/login') && isLoggedIn) {
      return this.router.parseUrl('/admin/home'); // Redirect to the admin home page
    }

    // If the user is logged in, allow access to admin routes
    if (isLoggedIn) {
      return true;
    }

    // If the user is not logged in and not already on the login page, navigate to the admin login page for any admin route
    if (!state.url.startsWith('/admin/login')) {
      return this.router.parseUrl('/admin/login');
    }

    // Otherwise, allow the user to stay on the login page
    return true;
  }
}