import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CanActivate} from "@angular/router";

@Injectable()
export class PersonalityService implements CanActivate {
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

  canActivate(): boolean {
    return this.loggedIn;
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
        // console.log(this.serverInfo.getServerBaseUrl())
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

  getUserInfo(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object>(observer => {
      this.http.get<object>(this.serverInfo.getServerBaseUrl() + "authorize/user-info", {headers: headers})
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
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object>(observer => {
      this.http.post<object>(this.serverInfo.getServerBaseUrl() + "authorize/update-user-info",
        {'firstName': userInfo['firstName'], 'lastName': userInfo['lastName'], 'nationalCode': userInfo['nationalCode']},
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

  registerAddress(address): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    // console.log(address)
    let ob = new Observable<object>(observer => {
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/register-address",
        address,{headers: headers})
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

  removeAddress(id): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<boolean>(observer => {
      this.http.delete<boolean>(this.serverInfo.getServerBaseUrl() + "address",
        {
          params: {id: id},
          headers: headers
        })
        .subscribe(res => {
          if(res['status'] == 0) {
            observer.next(true);
          } else
            observer.error(res['entity']);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
    return ob;
  }

  updateAddress(address): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    let ob = new Observable<object>(observer => {
      this.http.post<boolean>(this.serverInfo.getServerBaseUrl() + "authorize/update-address", address,{headers: headers})
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
    // console.log(this.cart);
    this.cart.forEach((value: object, key: string) => {
      items.push(value);
    });
    return items;
  }

  getHistory(): Observable<object[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey);

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      this.http.get<object[]>(this.serverInfo.getServerBaseUrl() + 'store/cart/history',
        {headers: headers}
      ).subscribe(res => {
        if(res['status'] === 0) {
          let entity = res['entity'];
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

  registerCart(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey)
      .append('Content-Type', 'application/json; charset=utf-8');

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object>(observer => {
      this.http.get<object>(this.serverInfo.getServerBaseUrl() + 'store/cart/register-cart',
        {headers: headers}
      ).subscribe(res => {
        if(res['status'] === 0) {
          this.cart = new Map();
          this.cartChangedInfluencedServer.next(this.cart);
          observer.next(this.cart);
        } else {
          observer.error(res['entity']);
        }
      }, err => {
        observer.error(err);
      });
    });
    return ob;
  }

  registerCartByAddressAndPayment(paymentTypeId, addressId): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey)
      .append('Content-Type', 'application/json; charset=utf-8');

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object>(observer => {
      this.http.get<object>(this.serverInfo.getServerBaseUrl() + 'store/cart/register-cart',
        { params: {paymentTypeId: paymentTypeId, addressId: addressId},
          headers: headers
        }
      ).subscribe(res => {
        if(res['status'] === 0) {
          this.cart = new Map();
          this.cartChangedInfluencedServer.next(this.cart);
          observer.next(this.cart);
        } else {
          observer.error(res['entity']);
        }
      }, err => {
        observer.error(err);
      });
    });
    return ob;
  }

  findCartHistory(cartId): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.sessionKey)
      .append('Content-Type', 'application/json; charset=utf-8');

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object>(observer => {
      this.http.get<object>(this.serverInfo.getServerBaseUrl() + 'store/cart/history/detail',
        { params: {cartId: cartId},
          headers: headers
        }
      ).subscribe(res => {
        if(res['status'] === 0) {
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
