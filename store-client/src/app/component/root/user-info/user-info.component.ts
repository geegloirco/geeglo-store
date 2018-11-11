import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";

import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MsgsysService} from "../../../service/msgsys/msgsys.service";
import {latLng, Map, marker, tileLayer} from "leaflet";
import {MapService} from "../../../service/map-service/map.service";
import {MapViewComponent} from "../map-view/map-view.component";

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
  selected = null;
  selectedOriginal = null;
  selectedLocation = {};

  constructor(
    public mapService: MapService,
    private zone: NgZone,
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

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.loadWaited = true;
        this.personalityService.getUserInfo().subscribe(res => {
          // console.log(res);
          this.userInfoModel = res['user-info'];
          // console.log(this.userInfoModel);
          this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));

          this.addresses = res['addresses'];
          console.log(this.addresses)
          if(!this.addresses) {
            console.log("is empty")
            this.addresses = [];
          }

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

  userInfoRegister() {
    this.loadWaited = true;
    this.personalityService.updateUserInfo(this.userInfoModel).subscribe(res => {
      this.loadWaited = false;
      this.userInfoModel = res;
      this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));
      this.messageService.add("با موفقیت انجام شد");
    }, err => {
      this.loadWaited = false;
      this.messageService.add("با شکست مواجه شد");
    });
  }

  userInfoCancel() {
    this.userInfoModel = this.userClone;
  }

  toggleAddressCollapseMap(address) {
    console.log(address);
    let lastState = this.addressSelectedMap[address['id']];
    for (let key in this.addressSelectedMap) {
      this.addressSelectedMap[key] = false;
    }
    this.addressSelectedMap[address['id']] = !lastState;
    // console.log(this.addressSelectedMap)

    if(this.addressSelectedMap[address['id']]) {
      this.selectedOriginal = address;
      this.selected = JSON.parse(JSON.stringify(this.selectedOriginal));
      this.mapService.setDefaultMarker(latLng(this.selected['latitude'], this.selected['longitude']));
    } else {
      this.selectedOriginal = null;
      this.selected = null;
    }

  }

  addressChangeOk() {
    // console.log(this.mapService.getMarker())
    // console.log(!this.mapService.getMarker())
    // console.log(this.addressSelectedMap[0])
    // if(!this.selected.latitude) {
    if(!this.mapService.getMarker()) {
      this.messageService.add("موقعیت روی نقشه انتخاب شود");
    } else if(this.addressSelectedMap[0]) {
      this.loadWaited = true;
      this.selected['latitude'] = this.mapService.getMarker().lat;
      this.selected['longitude'] = this.mapService.getMarker().lng;
      // console.log(this.selected)
      this.personalityService.registerAddress(this.selected).subscribe(res => {
        // console.log(res);
        this.addresses.push(res);
        this.addressSelectedMap[res['id']] = false;
        this.toggleAddressCollapseMap(res);
        this.messageService.add("موفق");
        this.loadWaited = false;
      }, err => {
        // console.log(err);
        this.messageService.add("نا موفق");
        this.loadWaited = false;
      });
    } else {
      this.selected['latitude'] = this.mapService.getMarker().lat;
      this.selected['longitude'] = this.mapService.getMarker().lng;
      if(JSON.stringify(this.selectedOriginal) === JSON.stringify(this.selected)) {
        // console.log('no change');
      } else {
        this.personalityService.updateAddress(this.selected).subscribe(res => {
          console.log(res);
          let index = this.addresses.indexOf(this.selectedOriginal);
          this.addresses[index] = res;
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
      // console.log(res);
      let index = this.addresses.indexOf(this.selectedOriginal);
      this.addresses.splice(index, 1);
      delete this.addressSelectedMap[this.selected['id']];
      // console.log(this.selectedLocation);
      this.selected = null;
      this.selectedOriginal = null;
      this.loadWaited = false;
      }, err => {
      console.log(err);
      this.loadWaited = false;
    });
  }

  addressChangeCancel() {
    this.mapService.defaultReset();
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

  // mapOnClick(evt) {
  //   // let c2 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  //   if(this.selected) {
  //     this.selected['latitude'] = evt['latlng']['lat'];
  //     this.selected['longitude'] = evt['latlng']['lng'];
  //     this.layers = [];
  //     this.layers.push(marker([ this.selected['latitude'], this.selected['longitude'] ]));
  //     this.mapCenter = latLng(this.selected['latitude'], this.selected['longitude']);
  //   }
  //
  //   // const map = evt.map;
  //   //     const point = map.forEachFeatureAtPixel(evt.pixel,
  //   //   function (feature, layer) {
  //   //   console.log(feature.getGeometry().getKeys());
  //   //   return feature;
  //   //   });
  // }

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
      this.mapService.defaultReset();
      // if(this.map) {
      //   this.zone.run(() => {
      //       setTimeout(() => {this.map.invalidateSize(true); console.log("invalidate")}, 1000);
      //   });
      // }
    } else {
      this.selectedOriginal = null;
      this.selected = null;
    }

  }
}
