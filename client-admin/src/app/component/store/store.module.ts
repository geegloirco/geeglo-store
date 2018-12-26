import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemViewComponent} from "./item-view/item-view.component";
import {StoreViewComponent} from "./store-view/store-view.component";
import {ItemsViewComponent} from "./items-view/items-view.component";
import {MapViewComponent} from "./map-view/map-view.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {GroupViewComponent} from "./group-view/group-view.component";


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
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
  ],
  providers: [
  ],
  exports: [
    ItemViewComponent,
    ItemsViewComponent,
    StoreViewComponent,
    MapViewComponent,
    GroupViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
