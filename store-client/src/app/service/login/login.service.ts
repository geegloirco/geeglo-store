import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {
  restUrl: string;
  sessionKey = null;

  constructor(
    private serverInfo: ServerInfoService,
    private http: HttpClient) {
  }

  getSessionKey(): string {
    return this.sessionKey;
  }

  init(restUrl: string): Observable<object> {
    this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
    let ob = new Observable<object>(observer => {
      this.http.get(this.restUrl).subscribe(res => {
        if (res['status'] == 0 || res['status'] == 1) {
          this.sessionKey = res['entity'];
          observer.next(res['entity']);
        } else {
          observer.error(res['entity']);
        }
      }, err => {
        observer.error(err);
      });
    });
    return ob;
  }

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
