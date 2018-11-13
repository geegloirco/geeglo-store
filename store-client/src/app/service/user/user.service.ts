import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CanActivate} from "@angular/router";
import {PersonalityService} from "../personality/personality.service";

@Injectable()
export class UserService {
  user = {};
  sessionKey = null;

  constructor(
    private serverInfo: ServerInfoService,
    private personalityService: PersonalityService,
    private http: HttpClient) {
  }

  getUser(): object {
    return this.user;
  }

  getUserInfo(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.personalityService.getSessionKey());
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object>(observer => {
      this.http.get<object>(this.serverInfo.getServerBaseUrl() + "user", {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            observer.next(res['entity']);
          } else
            observer.error(false);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
    return ob;
  }

  updateUserInfo(userInfo): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.personalityService.getSessionKey());
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object>(observer => {
      this.http.put<object>(this.serverInfo.getServerBaseUrl() + "user",
        userInfo,
        {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            observer.next(res['entity']);
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
