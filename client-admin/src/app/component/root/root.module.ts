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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarViewComponent} from "./navbar-view/navbar-view.component";
import {LoginViewComponent} from "./login-view/login-view.component";
import {StoreModule} from "../store/store.module";
import {FooterViewComponent} from "./footer-view/footer.component";
import {LoadWaitService} from "../../service/load-wait/load-wait.service";
import {LoadWaitComponent} from "./load-wait/load-wait.component";

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
  ],
  declarations: [
    DashboardComponent,
    RootContainerComponent,
    MessagesComponent,
    NavbarViewComponent,
    LoginViewComponent,
    LoadWaitComponent,
    FooterViewComponent,
  ],
  providers: [
  ],
  exports: [
    DashboardComponent,
    NavbarViewComponent,
    LoginViewComponent,
    FooterViewComponent,
    LoadWaitComponent,
  ],
  entryComponents: [
  ]
})
export class RootModule { }
