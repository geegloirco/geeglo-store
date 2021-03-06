import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemViewComponent } from "./item-view/item-view.component";
import { CartViewComponent } from "./cart-view/cart-view.component";
import { LoadWaitComponent } from "../root/load-wait/load-wait.component";
import { StoreViewComponent } from "./store-view/store-view.component";
import { ItemsViewComponent } from "./items-view/items-view.component";
import { MapViewComponent } from "./map-view/map-view.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { GroupViewComponent } from "./group-view/group-view.component";
import { UserHistoryViewComponent } from "./user-history-view/user-history-view.component";
import { UserAddressViewComponent } from "./user-address-view/user-address-view.component";
import { UserInfoViewComponent } from "./user-info-view/user-info-view.component";
import { PersonViewComponent } from "./person-view/person-view.component";
import {PurchaseViewComponent} from "./purchase-view/purchase-view.component";


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
    ItemsViewComponent,
    ItemViewComponent,
    CartViewComponent,
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
    PersonViewComponent,
    UserAddressViewComponent,
    UserHistoryViewComponent,
    UserInfoViewComponent,
    PurchaseViewComponent,
  ],
  providers: [
  ],
  exports: [
    ItemViewComponent,
    ItemsViewComponent,
    CartViewComponent,
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
    PersonViewComponent,
    UserAddressViewComponent,
    UserHistoryViewComponent,
    UserInfoViewComponent,
    PurchaseViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
