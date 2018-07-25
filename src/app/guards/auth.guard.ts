import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RootScopeService } from 'app/services/root-scope';
import { JwtHelper } from 'shared/utils/jwt.helper';
import { AuthService } from 'shared/services/auth.service';

import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _rootScope: RootScopeService,
    private _authService: AuthService,
  ) {
    if (!this._rootScope.hasCredential) {
      this._rootScope.fetchLocalStorageData();
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._rootScope.hasCredential) {
      const decode = JwtHelper.decodeToken(this._rootScope.token);

      if (moment().isSameOrAfter(moment(decode.exp * 1000).subtract(1, 'd'))) {
        this._authService.logout();
        return false;
      }
      if (JwtHelper.isTokenExpired(this._rootScope.token)) {
        this._authService.logout();
        return false;
      }

      return true;
    } else {
      this._router.navigate(['/login'], { queryParams: { redirect: state.url } });
      return false;
    }
  }

  canActivateChild (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
