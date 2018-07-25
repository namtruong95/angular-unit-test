import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// services
import { ApiService } from 'shared/services/api.service';
import { NotifyService } from 'shared/utils/notify.service';
import { BaseRootScopeService } from 'shared/utils/base-root-scope.service';

import { LoginData } from 'shared/interfaces/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _api: ApiService,
    private _rootScope: BaseRootScopeService,
    private _router: Router,
    private _notify: NotifyService,
  ) { }

  public login(loginData: LoginData) {
    return this._api.post('auth/user/login', loginData);
  }

  public logout() {
    this._api.post('/auth/logout').subscribe((res) => {
      localStorage.clear();
      this._rootScope.reset();
      this._router.navigate(['/login'], { replaceUrl: true });
    }, errors => {
      this._notify.error(errors);
    }, () => { });
  }
}
