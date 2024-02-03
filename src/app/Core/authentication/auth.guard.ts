import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userType = this.auth.getRole || null;
    if (userType === 'ADMIN' && route.data['roles'] && route.data['roles'].includes('ADMIN')) {
      return true;
    } else if (userType === 'CLIENT' && route.data['roles'] && route.data['roles'].includes('CLIENT')) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
