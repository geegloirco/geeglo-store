import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemViewComponent} from "./item-view/item-view.component";
import {CartViewComponent} from "./cart-view/cart-view.component";
import {RootModule} from "../root/root.module";
import {LoadWaitComponent} from "./load-wait/load-wait.component";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    LoadWaitComponent,
    ItemViewComponent,
    CartViewComponent,
  ],
  providers: [
  ],
  exports: [
    LoadWaitComponent,
    ItemViewComponent,
    CartViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
