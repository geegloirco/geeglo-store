import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';
import {RestResponse} from '../../model/rest-response';
import {MsgsysService} from '../msgsys/msgsys.service';

@Injectable()
export class MessageService {
  restUrl: string;

  constructor(
    private messageService: MsgsysService,
    private serverInfo: ServerInfoService,
    private http: HttpClient) {
  }

  init(restUrl: string) {
    this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
  }

  save(title: string, content: string, thirdPartyCode: string, allSelected: boolean, profiles: object[]): Observable<number> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("admin:123"));
    headers = headers.append("Content-Type", "application/json; charset=UTF-8;");

    let mobiles: number[] = [];

    for(let i = 0; i < profiles.length; i++) {
      mobiles.push(profiles[i]['id'])
    }

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<number>(observer => {
      this.http.post<number>(this.restUrl, {
        thirdPartyCode: thirdPartyCode,
        title: title,
        content: content,
        allSelected: allSelected,
        profiles: mobiles
      }, {headers: headers})
        .subscribe(res => {
          console.log(res);
          if(res === 0) {
            this.messageService.add('با موفقیت انجام شد.');
            observer.next(res);
          }
          else {
            this.messageService.add('با شکست انجام شد.');

            observer.error(res);
          }
        }, err => {
          this.messageService.add('با شکست انجام شد.');
          observer.error(err);
        });
    });
    return ob;
  }

  save2(title: string,
        content: string,
        thirdPartyCode: string,
        allSelected: boolean,
        profiles: object[],
        amount: number,
        balance: number,
        date: string,
        time: string,
        mcc: string,
        type: string): Observable<number> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("admin:123"));
    headers = headers.append("Content-Type", "application/json; charset=UTF-8;");

    let mobiles: number[] = [];

    for(let i = 0; i < profiles.length; i++) {
      mobiles.push(profiles[i]['mobile'])
    }

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<number>(observer => {
      this.http.post<number>(this.restUrl, {
        thirdPartyCode: thirdPartyCode,
        title: title,
        content: content,
        allSelected: allSelected,
        profiles: mobiles,
        amount: amount,
        balance: balance,
        date: date,
        time: time,
        mcc: mcc,
        type: type
      }, {headers: headers})
        .subscribe(res => {
          console.log(res);
          if(res === 0) {
            this.messageService.add('با موفقیت انجام شد.');
            observer.next(res);
          }
          else {
            this.messageService.add('با شکست انجام شد.');
            observer.error(res);
          }
        }, err => {
          this.messageService.add('با شکست انجام شد.');
          observer.error(err);
        });
    });
    return ob;
  }

}
