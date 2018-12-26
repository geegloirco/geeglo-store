import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CanActivate} from "@angular/router";

@Injectable()
export class PersonalityService implements CanActivate {
  restUrl: string;
  sessionKey = null;
  user = {};
  loggedIn = false;
  cart = new Map();
  loginStatus: BehaviorSubject<LoginStatus> = new BehaviorSubject(LoginStatus.nothing);
  initStatus: BehaviorSubject<ServiceInitStatus> = new BehaviorSubject(ServiceInitStatus.initial);
  cartChangedInfluencedServer: BehaviorSubject<object> = new BehaviorSubject({});

  constructor(
    private serverInfo: ServerInfoService,
    private http: HttpClient) {
  }

  canActivate(): boolean {
    return this.loggedIn;
  }

  getSessionKey(): string {
    return this.sessionKey;
  }

  getUser(): object {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.loginStatus.getValue() === LoginStatus.login ? true : false;
  }

  afterLoggedIn(): BehaviorSubject<LoginStatus> {
    return this.loginStatus;
  }

  afterInitialized(): BehaviorSubject<ServiceInitStatus> {
    return this.initStatus;
  }

  init() {
    this.initStatus.subscribe(res => {
      if(res.valueOf() == ServiceInitStatus.initial) {
        this.initStatus.next(ServiceInitStatus.requested);
        // console.log(this.serverInfo.getServerBaseUrl())
        this.http.get(this.serverInfo.getServerBaseUrl() + "authorize").subscribe(res => {
          if (res['status'] == 0) {
            let entity = res['entity'];
            this.sessionKey = entity['sessionKey'];
            this.loggedIn = true;
            this.initStatus.next(ServiceInitStatus.successed);
            this.loginStatus.next(LoginStatus.login);
          } else if(res['status'] === 1) {
            let entity = res['entity'];
            this.sessionKey = entity['sessionKey'];
            this.initStatus.next(ServiceInitStatus.successed);
            // this.loginStatus.next(LoginStatus.session);
          } else {
            this.initStatus.next(ServiceInitStatus.initial);
            // this.loginStatus.error(true);
          }
        }, err => {
          // this.loginStatus.error(true);
          this.initStatus.next(ServiceInitStatus.initial);
        });
      }
    });
  }

  login(username: string, password): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);

    let ob = new Observable<object>(observer => {
      this.http.post<object>(this.serverInfo.getServerBaseUrl() + "authorize/login", {
          "username": username,
          "password": password
        },
        {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            this.user['username'] = res['entity'];
            this.loggedIn = true;
            this.loginStatus.next(LoginStatus.login);
            observer.next(res['entity']);
          } else
            observer.error(res['entity']);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
    return ob;
  }

  logout(): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<boolean>(observer => {
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/logout", {
        },{headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            let entity = res['entity'];
            observer.next(true);
          } else
            observer.error(false);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
    return ob;
  }
}

export enum ServiceInitStatus {
  initial = 0,
  requested = 1,
  successed = 2,
}

export enum LoginStatus {
  nothing = 0,
  session = 1,
  login = 2,
  error = 3
}
