import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class PersonalityService {
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
        this.http.get(this.serverInfo.getServerBaseUrl() + "authorize").subscribe(res => {
          if (res['status'] == 0) {
            let entity = res['entity'];
            this.sessionKey = entity['sessionKey'];
            this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + entity['image'];
            this.user['username'] = entity['username'];
            this.loggedIn = true;
            let items : object = entity['cart'];
            let itemsProps = Object.keys(items);
            this.cart = new Map();
            for (let prop of itemsProps) {
              this.cart.set(prop, items[prop]);
            }
            this.initStatus.next(ServiceInitStatus.successed);
            this.loginStatus.next(LoginStatus.login);
            this.cartChangedInfluencedServer.next(this.cart);
          } else if(res['status'] === 1) {
            let entity = res['entity'];
            let items : object = entity['cart'];
            let itemsProps = Object.keys(items);
            this.cart = new Map();
            for (let prop of itemsProps) {
              this.cart.set(prop, items[prop]);
            }
            this.sessionKey = entity['sessionKey'];
            this.initStatus.next(ServiceInitStatus.successed);
            this.cartChangedInfluencedServer.next(this.cart);
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
  //           this.loginStatus.next(true);
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
      this.http.post<object>(this.serverInfo.getServerBaseUrl() + "authorize/login", {
          "username": mobileNo,
          "password": password
        },
        {headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            let entity = res['entity'];
            this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + entity['image'];
            this.user['username'] = entity['username'];
            this.loggedIn = true;
            let items : object = entity['cart'];
            let itemsProps = Object.keys(items);
            this.cart = new Map();
            for (let prop of itemsProps) {
              this.cart.set(prop, items[prop]);
            }
            this.loginStatus.next(LoginStatus.login);
            this.cartChangedInfluencedServer.next(this.cart);
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
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/register", {
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
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/verify", {
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
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/logout", {
        },{headers: headers})
        .subscribe(res => {
          if(res['status'] == 0) {
            let entity = res['entity'];
            this.sessionKey = entity['sessionKey'];
            let items : object = entity['cart'];
            let itemsProps = Object.keys(items);
            this.cart = new Map();
            for (let prop of itemsProps) {
              this.cart.set(prop, items[prop]);
            }
            this.cartChangedInfluencedServer.next({});
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

  afterCartChangedInfluencedServer(): BehaviorSubject<object> {
    return this.cartChangedInfluencedServer;
  }

  fillCount(item: object) {
    let cartItem = this.cart.get(String(item['id']));
    if (cartItem) {
      item['count'] = cartItem['count'];
    } else {
      item['count'] = 0;
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
    headers = headers.append("Authorization", "Bearer " + this.sessionKey)
      .append('Content-Type', 'application/json; charset=utf-8');

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      this.http.post<object[]>(this.serverInfo.getServerBaseUrl() + 'store/cart/change-cart',
        {'id': item['id'], 'title': item['title'], price: item['price'], 'count': count, image: item['image']},
        {headers: headers}
        ).subscribe(res => {
          if(res['status'] === 0) {
            let entity = res['entity'];
            item['count'] = entity['count']
            if(entity['count'] === 0)
              this.cart.delete(String(entity['id']));
            else
              this.cart.set(String(item['id']), item);
            this.cartChangedInfluencedServer.next(this.cart);
            observer.next(entity);
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
