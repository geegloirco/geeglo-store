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
import {PersonalityService} from "./service/personality/personality.service";
import {StoreModule} from "./component/store/store.module";
import {ItemInfoService} from "./service/item-info/item-info.service";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

export function startupServiceFactory(personalityService: PersonalityService): Function {
  return () => personalityService.init();
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
    LeafletModule.forRoot()
  ],
  providers: [
    RootContainerService,
    ServerInfoService,
    PersonalityService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [PersonalityService],
      multi: true
    },
    WindowRef,
    MessageService,
    MsgsysService,
    ItemInfoService,
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
