import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {latLng, Map, tileLayer} from "leaflet";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css']
})
export class StoreViewComponent implements OnInit {
  loadWaited = false;
  items = [];

  constructor(
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
      }
    });
  }
}
