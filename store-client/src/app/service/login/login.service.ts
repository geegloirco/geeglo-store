import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class LoginService {
  restUrl: string;
  sessionKey = null;
  user = {};
  loggedIn = false;
  loginResult: BehaviorSubject<LoginStatus> = new BehaviorSubject(LoginStatus.nothing);
  initStatus: BehaviorSubject<ServiceInitStatus> = new BehaviorSubject(ServiceInitStatus.initial);

  constructor(
    private serverInfo: ServerInfoService,
    private http: HttpClient) {
  }

  getSessionKey(): string {
    return this.sessionKey;
  }

  getUser(): object {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.loginResult.getValue() === LoginStatus.login ? true : false;
  }

  afterLoggedIn(): BehaviorSubject<LoginStatus> {
    return this.loginResult;
  }

  afterInitialized(): BehaviorSubject<ServiceInitStatus> {
    return this.initStatus;
  }

  init(restUrl: string): BehaviorSubject<LoginStatus> {
    this.initStatus.subscribe(res => {
      if(res.valueOf() == ServiceInitStatus.initial) {
        this.initStatus.next(ServiceInitStatus.requested);
        this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
        this.http.get(this.restUrl).subscribe(res => {
          console.log(res)
          if (res['status'] == 0) {
            this.sessionKey = res['entity'];
            if (typeof res === 'object') {
              this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + res['image'];
              this.user['username'] = res['username'];
              this.loggedIn = true;
            }
            this.initStatus.next(ServiceInitStatus.successed);
            this.loginResult.next(LoginStatus.login);
          } else if(res['status'] === 1) {
            this.sessionKey = res['entity'];
            this.initStatus.next(ServiceInitStatus.successed);
            this.loginResult.next(LoginStatus.session);
          } else {
            this.initStatus.next(ServiceInitStatus.initial);
            this.loginResult.error(true);
          }
        }, err => {
          this.loginResult.error(true);
          this.initStatus.next(ServiceInitStatus.initial);
        });
      }
    });

    return this.loginResult;
  }

  // init(restUrl: string): Observable<object> {
  //   this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
  //   let ob = new Observable<object>(observer => {
  //     this.http.get(this.restUrl).subscribe(res => {
  //       if (res['status'] == 0 || res['status'] == 1) {
  //         this.sessionKey = res['entity'];
  //         if (typeof res === 'object') {
  //           this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + res['image'];
  //           this.user['username'] = res['username'];
  //           this.loggedIn = true;
  //           this.resCall = true;
  //           this.loginResult.next(true);
  //         }
  //         observer.next(res['entity']);
  //       } else {
  //         this.resCall = false;
  //         observer.error(res['entity']);
  //       }
  //     }, err => {
  //       this.resCall = false;
  //       observer.error(err);
  //     });
  //   });
  //   return ob;
  // }

  login(mobileNo: string, password): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);

    let ob = new Observable<object>(observer => {
      this.http.post<object>(this.restUrl + "/login", {
          "username": mobileNo,
          "password": password
        },
        {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
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

  register(mobileNo: string, password: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);

    let ob = new Observable<boolean>(observer => {
      this.http.post<boolean>(this.restUrl + "/register", {
        "username": mobileNo,
        "password": password
        },
        {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            observer.next(true);
          } else
            observer.error(res);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
    return ob;
  }

  verify(verifyCode: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<boolean>(observer => {
      this.http.post<boolean>(this.restUrl + "/verify", {
        },
        {params: {"otp": verifyCode}, headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            this.sessionKey = res['entity']['session-key'];
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

  logout(): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<boolean>(observer => {
      this.http.post<boolean>(this.restUrl + "/logout", {
        },{headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            this.sessionKey = res['entity']['session-key'];
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
