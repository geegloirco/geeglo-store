import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';
import {LoginService} from "../login/login.service";

@Injectable()
export class CartInfoService {
  restUrl: string;
  cart = new Map();
  inited = false;

  constructor(
    private serverInfo: ServerInfoService,
    private loginService: LoginService,
    private http: HttpClient) {
  }

  init(restUrl: string) {
    if(this.inited == false) {
      this.inited = true;
      this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
    }
  }

  getItems(): object[] {
    let items = [];
    this.cart.forEach((value: object, key: string) => {
      items.push(value);
    });
    return items;
  }

  changeToCart(item, count): Observable<object[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.loginService.getSessionKey());

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      this.http.get<object[]>(this.restUrl + '/change-cart', {
        params: {'id': item['id'], 'count': count}, headers: headers})
        .subscribe(res => {
          console.log(res);
          if(res['status'] === 0) {
            item['count'] = res['entity']
            this.cart.set(item['id'], item);
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

}
