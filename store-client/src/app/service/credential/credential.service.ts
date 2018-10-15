import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {Observable} from 'rxjs';

@Injectable()
export class CredentialService {
  restUrl: string;

  constructor(
    private serverInfo: ServerInfoService,
    private http: HttpClient) {
  }

  init(restUrl: string) {
    this.restUrl = this.serverInfo.getServerBaseUrl() + restUrl;
  }

  getAll(): Observable<object[]> {
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<object[]>(observer => {
      this.http.get<object[]>(this.restUrl, {headers: headers})
        .subscribe(res => {
          console.log(res);
          if(res != null && res.length > 0)
            observer.next(res);
          else
            observer.error(res);
        }, err => {
          observer.error(err);
        });
    });
    return ob;
  }

  update(credential): Observable<boolean> {
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<boolean>(observer => {
      this.http.get<object>(this.restUrl + '/update', {
        headers: headers,
        params: {
          'key': credential['propertyKey'],
          'value': credential['propertyValue']
        }
      })
        .subscribe(res => {
          console.log(res);
          if(res['status'] == 0)
            observer.next(true);
          else
            observer.error(res);
        }, err => {
          observer.error(err);
        });
    });
    return ob;
  }

  delete(credential): Observable<boolean> {
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<boolean>(observer => {
      this.http.get<object>(this.restUrl + '/delete', {
        headers: headers,
        params: {
          'key': credential['propertyKey'],
          'value': credential['propertyValue']
        }
      })
        .subscribe(res => {
          console.log(res);
          if(res['status'] == 0)
            observer.next(true);
          else
            observer.error(res);
        }, err => {
          observer.error(err);
        });
    });
    return ob;
  }

  save(key: string, value: string): Observable<boolean> {
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Basic " + btoa("admin:123"));

    // Todo: send the message _after_ fetching the Third Parties
    let ob = new Observable<boolean>(observer => {
      this.http.get<object>(this.restUrl + '/save', {
        headers: headers,
        params: {
          'key': key,
          'value': value
        }
      })
        .subscribe(res => {
          console.log(res);
          if(res['status'] == 0)
            observer.next(true);
          else
            observer.error(res);
        }, err => {
          observer.error(err);
        });
    });
    return ob;
  }

}
