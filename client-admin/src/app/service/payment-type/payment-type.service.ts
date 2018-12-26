import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';
import {PersonalityService} from "../personality/personality.service";

@Injectable()
export class PaymentTypeService {
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

  getPaymentType(): Observable<object[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.personalityService.getSessionKey());
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object[]>(observer => {
      this.http.get<object[]>(this.serverInfo.getServerBaseUrl() + "store/payment-type", {headers: headers})
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
