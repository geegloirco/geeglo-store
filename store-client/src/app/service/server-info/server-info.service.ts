import { Injectable } from '@angular/core';

@Injectable()
export class ServerInfoService {

  isLocalhost = false;
  deployContext = "";
  // deployContext = '';
  // protocol: string = '';
  protocol: string = 'http';
  // protocol: string = 'https';
  // host: string = 'localhost'
  // host: string = '157.119.190.215'
  host: string = '192.168.50.144'
  // host: string = '192.168.43.111'

  // port: string = '';
  port: string = '8000';
  // port: string = '8443';
  baseUrl: string = "";



  constructor() {
    if(this.isLocalhost) {
      this.baseUrl = 'http://localhost/';
    }
    else if(this.protocol == '' && this.host == '' && this.port == '') {
      this.baseUrl = '';
    }
    else {
      this.baseUrl = this.protocol + '://';

      if(this.host)
        this.baseUrl += this.host;
      else
        this.baseUrl += "localhost";

      if(this.port) {
        if(this.port === '443' || this.port === '80') {

        } else {
          this.baseUrl += ':' + this.port;
        }
      }

      this.baseUrl += "/";
    }
  }

  getServerBaseUrl(): string {
    return this.baseUrl;
  }

  getServerContextUrl(): string {
    if(this.deployContext != null && this.deployContext != "")
      return this.deployContext + "/";
    else
      return "";
  }

}
