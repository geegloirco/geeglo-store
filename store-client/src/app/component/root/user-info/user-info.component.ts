import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import * as ol from 'openlayers';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  loadWaited = false;

  userInfoModel = null;
  userClone = null;

  addresses = null;
  addressSelectedMap = {};

  constructor(
    private modalService: NgbModal,
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

  userInfoRegister() {
    this.loadWaited = true;
    this.personalityService.updateUserInfo(this.userInfoModel).subscribe(res => {
      this.loadWaited = false;
      this.userInfoModel = res;
      this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));

    }, err => {
      this.loadWaited = false;
    });
  }

  userInfoCancel() {
    this.userInfoModel = this.userClone;
  }

  // address = {
  //   'title': '',
  //   'detail': '',
  //   'latitude': '',
  //   'longitude': '',
  //   'phoneNumber': '',
  //   'postCode': '',
  // };



  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.loadWaited = true;
        this.personalityService.getUserInfo().subscribe(res => {
          this.userInfoModel = res['user-info'];
          this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));

          this.addresses = res['addresses'];
          this.addressSelectedMap = {};
          for(let a of this.addresses) {
            this.addressSelectedMap[a['id']] = false;
          }
          this.addressSelectedMap[0] = false;
          this.loadWaited = false;
        }, err => {
          this.loadWaited = false;
        })
      }
    });
  }

  selected = null;
  selectedOriginal = null;

  toggleAddressCollapseMap(address) {
    console.log(address);
    let lastState = this.addressSelectedMap[address['id']];
    for (let key in this.addressSelectedMap) {
      this.addressSelectedMap[key] = false;
    }
    this.addressSelectedMap[address['id']] = !lastState;
    console.log(this.addressSelectedMap)

    if(this.addressSelectedMap[address['id']]) {
      this.selectedOriginal = address;
      this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
    } else {
      this.selectedOriginal = null;
      this.selected = null;
    }

  }

  addressChangeOk() {
    if(this.addressSelectedMap[0]) {
      this.loadWaited = true;
      this.personalityService.registerAddress(this.selected).subscribe(res => {
        console.log(res);
        this.userInfoModel['addresses'].push(res);
        this.addressSelectedMap[res['id']] = false;
        this.toggleAddressCollapseMap(res);
        this.loadWaited = false;
      }, err => {
        console.log(err);
        this.loadWaited = false;
      });
    } else {
      if(JSON.stringify(this.selectedOriginal) === JSON.stringify(this.selected)) {
        console.log('no change');
      } else {
        this.personalityService.updateAddress(this.selected).subscribe(res => {
          console.log(res);
          let index = this.userInfoModel['addresses'].indexOf(this.selectedOriginal);
          this.userInfoModel['addresses'][index] = res;
          this.loadWaited = false;
        }, err => {
          console.log(err);
          this.loadWaited = false;
        });
      }
    }
  }

  removeAddress() {
    this.personalityService.removeAddress(this.selected).subscribe(res => {
      console.log(res);
      let index = this.userInfoModel['addresses'].indexOf(this.selectedOriginal);
      this.userInfoModel['addresses'].splice(index, 1);
      delete this.addressSelectedMap[this.selected['id']];
      console.log(this.selectedLocation);
      this.selected = null;
      this.selectedOriginal = null;
      this.loadWaited = false;
    }, err => {
      console.log(err);
      this.loadWaited = false;
    });
  }

  addressChangeCancel() {
    this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
  }

  // addressOver(address) {
  //   console.log(address);
  //   this.overDetail = address['detail'];
  // }
  //
  // addressLeave(address) {
  //   console.log('leave');
  //   if(this.selected)
  //     this.overDetail = this.selected['detail'];
  //   else
  //     this.overDetail = null;
  // }

  selectedLocation = {};

  mapOnClick(evt) {
    console.log('map clicked')
    let c2 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    if(this.selected) {
      this.selected['longitude'] = c2[0];
      this.selected['latitude'] = c2[1];
      // console.log(this.selectedLocation);
    }


    const map = evt.map;
        const point = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
      console.log(feature.getGeometry().getKeys());
      return feature;
      });
  }

  createNewAddress() {
    let lastState = this.addressSelectedMap[0];
    for (let key in this.addressSelectedMap) {
      this.addressSelectedMap[key] = false;
    }
    this.addressSelectedMap[0] = !lastState;

    if(this.addressSelectedMap[0]) {
      this.selectedOriginal = {
        'id': 0,
        'title': '',
        'detail': '',
        'phoneNumber': '',
        'postCode': '',
        'longitude': null,
        'latitude': null,
      }
      this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
    } else {
      this.selectedOriginal = null;
      this.selected = null;
    }

  }

}
