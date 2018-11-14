import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';
import {PersonalityService} from "../personality/personality.service";

@Injectable()
export class ItemInfoService {
  restUrl: string;
  lastPage = 0;
  itemByGroup = {}
  items = null;

  constructor(
    private serverInfo: ServerInfoService,
    private personalityService: PersonalityService,
    private http: HttpClient) {
  }

  init(restUrl: string) {
    this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
  }

  getItems(groupId?): Observable<object[]> {
    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      if(!groupId)
        groupId = 0;
      if(groupId in this.itemByGroup) {
        observer.next(this.itemByGroup[groupId]);
      } else {
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer " + this.personalityService.getSessionKey());
        let params = {};
        if(groupId && groupId > 0)
          params['group-id'] = groupId;
        this.http.get<object[]>(this.restUrl, {params: params, headers: headers})
          .subscribe(res => {
            // console.log(res);
            if(res['status'] === 0) {
              // this.items = res['entity'];
              this.itemByGroup[groupId] = res['entity'];
              observer.next(this.itemByGroup[groupId]);
            } else
              observer.error(res['entity']);
          }, err => {
            observer.error(err);
          });
      }
    });
    return ob;
  }

  // setItemToCart(item, count): Observable<object[]> {
  //   let headers = new HttpHeaders();
  //   headers = headers.append("Authorization", "Bearer " + this.loginService.getSessionKey());
  //
  //   // Todo: send the message _after_ fetching the Third Parties
  //   let ob = new Observable<object[]>(observer => {
  //     this.http.get<object[]>(this.restUrl + '/change-cart', {
  //       params: {'id': item['id'], 'count': count}, headers: headers})
  //       .subscribe(res => {
  //         console.log(res);
  //         if(res['status'] === 0)
  //           observer.next(res['entity']);
  //         else
  //           observer.error(res['entity']);
  //       }, err => {
  //         observer.error(err);
  //       });
  //   });
  //   return ob;
  // }

}
