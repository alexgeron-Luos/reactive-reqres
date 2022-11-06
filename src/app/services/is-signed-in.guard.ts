import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuard {
  constructor(private router: Router, private authStore: AuthStore) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isSignedIn = localStorage.getItem('auth_data');

    if (!isSignedIn) {
      this.router.navigateByUrl('/login');
    }

    return isSignedIn;
  }
}
