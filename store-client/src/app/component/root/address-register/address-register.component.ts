import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {ServiceInitStatus, PersonalityService, LoginStatus} from "../../../service/personality/personality.service";
import * as ol from 'openlayers';

@Component({
  selector: 'address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.css']
})
export class AddressRegisterComponent implements OnInit {
  loadWaited = false;

  constructor(
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }

  address = {
    'title': '',
    'detail': '',
    'latitude': '',
    'longitude': '',
    'phoneNumber': '',
    'postCode': '',
  };
  items = [];

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
      }
    });
  }

  selectedLocation = null;

  mapOnClick(evt) {
    let c2 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    this.selectedLocation = {'x': c2[0], 'y': c2[1]};
    console.log(this.selectedLocation);

    const map = evt.map;
        const point = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
      console.log(feature.getGeometry().getKeys());
      return feature;
      });
  }

  register() {
    if(this.selectedLocation) {
      this.address.longitude = this.selectedLocation.x;
      this.address.latitude = this.selectedLocation.y;
      this.loadWaited = true;
      this.personalityService.registerAddress(this.address).subscribe(res => {
        this.loadWaited = false;
      }, err => {
        this.loadWaited = false;
      });
    }
  }
}
