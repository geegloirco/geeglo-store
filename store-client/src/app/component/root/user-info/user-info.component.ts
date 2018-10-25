import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {ServiceInitStatus, PersonalityService, LoginStatus} from "../../../service/personality/personality.service";
import * as ol from 'openlayers';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  loadWaited = false;
  userInfoModel;

  constructor(
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    public messageService: MsgsysService) {
    this.userInfoModel = {
      "firstName": '',
      "lastName": '',
      "nationalCode": '',
      "addresses":[]
    }
  }

  // address = {
  //   'title': '',
  //   'detail': '',
  //   'latitude': '',
  //   'longitude': '',
  //   'phoneNumber': '',
  //   'postCode': '',
  // };

  addressCollapseMap = {};

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.loadWaited = true;
        this.personalityService.getUserInfo().subscribe(res => {
          this.userInfoModel = res;
          this.addressCollapseMap = {};
          for(let a of this.userInfoModel.addresses) {
            this.addressCollapseMap[a['id']] = true;
          }
          this.loadWaited = false;
        }, err => {
          this.loadWaited = false;
        })
      }
    });
  }

  toggleAddressCollapseMap(address) {
    for (let x in this.addressCollapseMap) {
      this.addressCollapseMap[x] = false;
    }
    this.addressCollapseMap[address['id']] = !this.addressCollapseMap[address['id']];

    this.selectedLocation['x'] = address['longitude'];
    this.selectedLocation['y'] = address['latitude'];
  }

  selectedLocation = {};

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


}
