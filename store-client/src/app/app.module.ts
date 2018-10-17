import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BaseComponent} from './component/base/base.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RootModule} from './component/root/root.module';
import {ServerInfoService} from './service/server-info/server-info.service';
import {RootContainerService, WindowRef} from './component/root/root-container/root-container.component';
import {MessageService} from './service/message/message.service';
import {MsgsysService} from './service/msgsys/msgsys.service';
import {CredentialService} from "./service/credential/credential.service";
import {LoginService} from "./service/login/login.service";
import {StoreModule} from "./component/store/store.module";
import {ItemInfoService} from "./service/item-info/item-info.service";
import {CartInfoService} from "./service/cart-info/cart-info.service";

export function startupServiceFactory(loginService: LoginService): Function {
  return () => loginService.init("authorize").subscribe(res => {
    // if (typeof res === 'object') {
    //   this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + res['image'];
    //   this.user['username'] = res['username'];
    //   this.isLoggedIn = true;
    // }
  }, err => {
  });
}

@NgModule({
  declarations: [
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RootModule,
    StoreModule,
  ],
  providers: [
    RootContainerService,
    ServerInfoService,
    LoginService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [LoginService],
      multi: true
    },
    WindowRef,
    CredentialService,
    MessageService,
    MsgsysService,
    ItemInfoService,
    CartInfoService,
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
