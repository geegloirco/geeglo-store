import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemViewComponent} from "./item-view/item-view.component";
import {CartViewComponent} from "./cart-view/cart-view.component";
import {LoadWaitComponent} from "./load-wait/load-wait.component";
import {StoreViewComponent} from "./store-view/store-view.component";
import {ItemsViewComponent} from "./items-view/items-view.component";
import {UserAddressViewComponent} from "./user-address-view/user-address-view.component";
import {MapViewComponent} from "./map-view/map-view.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {UserInfoViewComponent} from "./user-info-view/user-info-view.component";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    LeafletModule,
  ],
  declarations: [
    LoadWaitComponent,
    ItemsViewComponent,
    ItemViewComponent,
    CartViewComponent,
    StoreViewComponent,
    MapViewComponent,
    UserAddressViewComponent,
    UserInfoViewComponent,
  ],
  providers: [
  ],
  exports: [
    LoadWaitComponent,
    ItemViewComponent,
    ItemsViewComponent,
    CartViewComponent,
    StoreViewComponent,
    MapViewComponent,
    UserAddressViewComponent,
    UserInfoViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
