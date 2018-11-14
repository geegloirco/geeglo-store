import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {latLng, Map, tileLayer} from "leaflet";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  loadWaited = false;
  items = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.activatedRoute.params.subscribe(res => {
          this.itemInfoService.getItems(res['groupId']).subscribe(res => {
            this.items = res;
          }, err => {
          });
        })
      }
    });
  }
}
