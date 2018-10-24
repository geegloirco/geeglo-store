import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {ServiceInitStatus, PersonalityService, LoginStatus} from "../../../service/personality/personality.service";
import * as ol from 'openlayers';

@Component({
  selector: 'items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  loadWaited = false;

  constructor(
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }
  lat: number = 51.678418;
  lng: number = 7.809007;

  items = [];

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.itemInfoService.getItems().subscribe(res => {
          this.items = res;
        }, err => {
        });
      }
    });
  }

  coords;

  mapOnClick(evt) {
    let c2 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    console.log(c2);

    const map = evt.map;
        const point = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
      console.log(feature.getGeometry().getKeys());
      return feature;
      });
  }
}
