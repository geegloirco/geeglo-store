import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginService, ServiceInitStatus} from "../login/login.service";

@Injectable()
export class CartInfoService {
  restUrl: string;
  cart = new Map();
  inited = false;
  initStatus: BehaviorSubject<ServiceInitStatus> = new BehaviorSubject(ServiceInitStatus.initial);

  constructor(
    private serverInfo: ServerInfoService,
    private loginService: LoginService,
    private http: HttpClient) {
  }

  afterInitialized(): BehaviorSubject<ServiceInitStatus> {
    return this.initStatus;
  }

  fillCount(item: object) {
    let cartItem = this.cart.get(item['id']);

    if (cartItem) {
      item['count'] = cartItem['count'];
    }
  }

  init(restUrl: string) {
    if(this.initStatus.getValue() == ServiceInitStatus.initial) {
      this.initStatus.next(ServiceInitStatus.requested);
      this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;

      this.loginService.afterInitialized().subscribe(res => {
        if(res.valueOf() === ServiceInitStatus.successed) {
          let headers = new HttpHeaders();
          headers = headers.append("Authorization", "Bearer " + this.loginService.getSessionKey());

          this.http.get(this.restUrl, {headers: headers}).subscribe(res => {
            if(res['status'] === 0) {
              let items : object = res['entity'];
              let itemsProps = Object.keys(items);
              for (let prop of itemsProps) {
                this.cart.set(prop, {'id': prop, 'count': items[prop]});
              }
              console.log('items')
              console.log(items)
              this.initStatus.next(ServiceInitStatus.successed);
            }
          }, err => {
            this.initStatus.next(ServiceInitStatus.initial);
          });
        }
      });
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
