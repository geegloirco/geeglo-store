import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemViewComponent} from "./item-view/item-view.component";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    ItemViewComponent,
  ],
  providers: [
  ],
  exports: [
    ItemViewComponent,
  ],
  entryComponents: [
  ]
})
export class StoreModule { }
