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
import {StoreModule} from "../store/store.module";
import {AgmCoreModule} from "@agm/core";
import {AngularOpenlayersModule} from 'angular2-openlayers';
import {AddressRegisterComponent} from "./address-register/address-register.component";
import {UserInfoComponent} from "./user-info/user-info.component";

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
    AngularOpenlayersModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDA7i_rPXzsehpFoE0O9Hxu28ycJ4s5qTI'
    })
  ],
  declarations: [
    DashboardComponent,
    ItemsViewComponent,
    UserInfoComponent,
    AddressRegisterComponent,
    RootContainerComponent,
    MessagesComponent,
    NavbarViewComponent,
    LoginViewComponent
  ],
  providers: [
  ],
  exports: [
    DashboardComponent,
    ItemsViewComponent,
    UserInfoComponent,
    AddressRegisterComponent,
    NavbarViewComponent,
    LoginViewComponent,
  ],
  entryComponents: [
  ]
})
export class RootModule { }
