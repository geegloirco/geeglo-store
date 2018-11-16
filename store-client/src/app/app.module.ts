import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BaseComponent} from './component/base/base.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RootModule} from './component/root/root.module';
import {ServerInfoService} from './service/server-info/server-info.service';
import {RootContainerService} from './component/root/root-container/root-container.component';
import {MessageService} from './service/message/message.service';
import {PersonalityService} from "./service/personality/personality.service";
import {StoreModule} from "./component/store/store.module";
import {ItemInfoService} from "./service/item-info/item-info.service";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MapService} from "./service/map-service/map.service";
import {UserService} from "./service/user/user.service";
import {AddressService} from "./service/address/address.service";
import {GroupService} from "./service/group/group.service";
import {WindowRefService} from "./service/window-ref/window-ref.service";

export function startupServiceFactory(personalityService: PersonalityService, mapService: MapService): Function {
  return () => {
    personalityService.init();
    mapService.init();
  }
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
    UserService,
    AddressService,
    GroupService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [PersonalityService, MapService],
      multi: true
    },
    WindowRefService,
    MessageService,
    ItemInfoService,
    MapService,
  ],
  bootstrap: [BaseComponent]
})
export class AppModule { }
