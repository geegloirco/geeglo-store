import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';
import {LoginService} from "../login/login.service";

@Injectable()
export class ItemInfoService {
  restUrl: string;
  lastPage = 0;

  constructor(
    private serverInfo: ServerInfoService,
    private loginService: LoginService,
    private http: HttpClient) {
  }

  init(restUrl: string) {
    this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
  }

  getItems(): Observable<object[]> {
    console.log("before call")
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.loginService.getSessionKey());

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      this.http.get<object[]>(this.restUrl, {headers: headers})
        .subscribe(res => {
          console.log(res);
          if(res['status'] === 0)
            observer.next(res['entity']);
          else
            observer.error(res['entity']);
        }, err => {
          observer.error(err);
        });
    });
    return ob;
  }

}
