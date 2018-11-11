import {NgModule} from '@angular/core';
import {ModalModule} from "ng2-bs4-modal/lib/ng2-bs4-modal.module";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RootContainerComponent} from './root-container/root-container.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MessagesComponent} from './messages/messages.component';
import {ChartsModule} from 'ng2-charts';
import {ItemsViewComponent} from "./items-view/items-view.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarViewComponent} from "./navbar-view/navbar-view.component";
import {LoginViewComponent} from "./login-view/login-view.component";
import {UserInfoComponent} from "./user-info/user-info.component";

import {StoreModule} from "../store/store.module";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {MapViewComponent} from "./map-view/map-view.component";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
    ChartsModule,
    NgbModule,
    StoreModule,
    LeafletModule
  ],
  declarations: [
    DashboardComponent,
    ItemsViewComponent,
    UserInfoComponent,
    RootContainerComponent,
    MessagesComponent,
    NavbarViewComponent,
    LoginViewComponent,
    MapViewComponent,
  ],
  providers: [
  ],
  exports: [
    DashboardComponent,
    ItemsViewComponent,
    UserInfoComponent,
    NavbarViewComponent,
    LoginViewComponent,
    MapViewComponent,
  ],
  entryComponents: [
  ]
})
export class RootModule { }
