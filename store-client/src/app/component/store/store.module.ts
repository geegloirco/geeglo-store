import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemViewComponent } from "./item-view/item-view.component";
import { CartViewComponent } from "./cart-view/cart-view.component";
import { LoadWaitComponent } from "./load-wait/load-wait.component";
import { StoreViewComponent } from "./store-view/store-view.component";
import { ItemsViewComponent } from "./items-view/items-view.component";
import { MapViewComponent } from "./map-view/map-view.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { GroupViewComponent } from "./group-view/group-view.component";
import { OrderViewComponent } from "./order-view/order-view.component";
import { UserHistoryViewComponent } from "./user-history-view/user-history-view.component";
import { UserAddressViewComponent } from "./user-address-view/user-address-view.component";
import { UserInfoViewComponent } from "./user-info-view/user-info-view.component";
import { PersonViewComponent } from "./person-view/person-view.component";


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
    OrderViewComponent,
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
    PersonViewComponent,
    UserAddressViewComponent,
    UserHistoryViewComponent,
    UserInfoViewComponent,
  ],
  providers: [
  ],
  exports: [
    LoadWaitComponent,
    ItemViewComponent,
    ItemsViewComponent,
    CartViewComponent,
    OrderViewComponent,
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
    PersonViewComponent,
    UserAddressViewComponent,
    UserHistoryViewComponent,
    UserInfoViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
