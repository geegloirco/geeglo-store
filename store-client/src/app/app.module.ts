import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
    WindowRef,
    ServerInfoService,
    CredentialService,
    MessageService,
    MsgsysService,
    LoginService,
    ItemInfoService,
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
