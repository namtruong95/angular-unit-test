import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import * as urljoin from 'url-join';

import { QueryEncodeHelper } from 'shared/utils/query-encode-helper';

import { BaseRootScopeService } from 'shared/utils/base-root-scope.service';
import { NotifyService } from 'shared/utils/notify.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl: string;
  public get apiUrl(): string {
    return this._apiUrl;
  }
  public set apiUrl(v: string) {
    this._apiUrl = v;
  }

  constructor(
    private _http: Http,
    private _rootScope: BaseRootScopeService,
    private _router: Router,
    private _notify: NotifyService,
  ) { }

  private _generateHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    if (this._rootScope.hasCredential) {
      headers.append('Authorization', `Bearer ${this._rootScope.token}`);
    }

    return headers;
  }

  public get(url: string, opts?: any): Observable<any> {
    const headers = this._generateHeaders();
    const path = urljoin(this.apiUrl, url);

    const params = new URLSearchParams('', new QueryEncodeHelper());

    if (opts) {
      Object.keys(opts).map(k => {
        if ((opts[k] && opts[k].constructor === Boolean) || opts[k] === false) {
          params.append(k, Number(opts[k]).toString());
        } else {
          params.append(k, opts[k]);
        }
      });
    }

    const urlEtag = path + (params.paramsMap.size > 0 ? `?${params.toString()}` : '');

    if (this._rootScope.etags[urlEtag]) {
      headers.append('if-none-match', this._rootScope.etags[urlEtag]);
    }

    return this._http
      .get(path, {
        headers: headers,
        search: params
      })
      .map((response: Response) => {
        if (response.status === 200) {
          this._rootScope.etags[response.url] = response.headers.get('etag');
        }

        if (response.status === 204) {
          return response;
        }

        const content = response.headers.get('Content-Type');

        if (content.indexOf('text/csv') >= 0 || content.indexOf('octet-stream') >= 0 || content.indexOf('application/vnd') >= 0) {
          return response.text();
        }
        return response.json();
      })
      .catch((errors: any) => {
        return this._catchErrors(errors);
      });
  }

  public post(url: string, body?: any): Observable<any> {

    const headers = this._generateHeaders();
    const path = urljoin(this.apiUrl, url);

    return this._http
      .post(path, body, {
        headers: headers
      })
      .map((response: Response) => {
        return response.json();
      })
      .catch((errors: any) => {
        return this._catchErrors(errors);
      });
  }

  public put(url: string, body: any): Observable<any> {
    const headers = this._generateHeaders();
    const path = urljoin(this.apiUrl, url);

    return this._http
      .put(path, body, {
        headers: headers
      })
      .map((response: Response) => {
        return response.json();
      })
      .catch((errors: any) => {
        return this._catchErrors(errors);
      });
  }

  public delete(url: string): Observable<any> {
    const headers = this._generateHeaders();
    const path = urljoin(this.apiUrl, url);

    return this._http
      .delete(path, {
        headers: headers
      })
      .map((response: Response) => {
        return response;
      })
      .catch((errors: any) => {
        return this._catchErrors(errors);
      });
  }

  private _catchErrors(errors: any) {
    switch (errors.status) {
      case 401:
        return this._unauthorizedMsg(errors.json());
      case 0:
        this._internetOffline();
        return;
      default:
        return Observable.throw({...errors.json(), status: errors.status});
    }
  }

  private _unauthorizedMsg(errors: any) {
    const unauthorizedMessage = errors.message || 'セッションの有効期限が切れました';
    this._notify.error(unauthorizedMessage);
    localStorage.clear();
    this._rootScope.reset();
    return this._router.navigate(['/login']);
  }

  private _internetOffline() {
    const errorMessage = 'インターネットの接続がありません';
    this._notify.error(errorMessage);
  }
}
