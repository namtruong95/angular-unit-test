import { Injectable } from '@angular/core';
import { User } from 'shared/models/user';
import { JwtHelper } from 'shared/utils/jwt.helper';

interface Credential {
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseRootScopeService {

  private _credential: Credential;
  public get credential(): Credential {
    return this._credential;
  }
  public set credential(v: Credential) {
    this._credential = v;
  }
  public get hasCredential(): boolean {
    return this.credential && this.credential.hasOwnProperty('token');
  }
  public get token(): string {
    return this.hasCredential ? this.credential.token : null;
  }

  private _curUser: User;
  public get curUser(): User {
    return this._curUser;
  }
  public set curUser(v: User) {
    this._curUser = v;
  }

  private _etags: object;
  public get etags(): object {
    return this._etags;
  }
  public set etags(v: object) {
    this._etags = v;
  }

  constructor() {
    this.reset();
  }

  /**
   * @return true if token unexpired
   * @return false if token expired or no token
   */
  public fetchLocalStorageData(): void {
    try {
      const data = JSON.parse(localStorage.getItem('sod_app'));

      if (data.hasOwnProperty('token')) {
        this.credential = { token: data.token };
      }

      this.curUser = new User(JwtHelper.decodeToken(this.token).context);
    } catch (e) { }
  }

  public reset() {
    this.credential = {};
    this.etags = {};
    this.curUser = new User();
  }
}
