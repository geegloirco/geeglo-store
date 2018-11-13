import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";

import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {latLng, Map, marker, tileLayer} from "leaflet";
import {MapService} from "../../../service/map-service/map.service";
import {MapViewComponent} from "../../store/map-view/map-view.component";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  loadWaited = false;

  addresses = null;
  addressSelectedMap = {};
  selected = null;
  selectedOriginal = null;
  selectedLocation = {};

  constructor(
    private zone: NgZone,
    private modalService: NgbModal,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    public mapService: MapService,
    public messageService: MessageService) {
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        // this.loadWaited = true;
        // this.personalityService.getUserInfo().subscribe(res => {
        //   // console.log(res);
        //   // this.userInfoModel = res['user-info'];
        //   // console.log(this.userInfoModel);
        //   // this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));
        //
        //   this.addresses = res['addresses'];
        //   console.log(this.addresses)
        //   if(!this.addresses) {
        //     console.log("is empty")
        //     this.addresses = [];
        //   }
        //
        //   this.addressSelectedMap = {};
        //   for(let a of this.addresses) {
        //     this.addressSelectedMap[a['id']] = false;
        //   }
        //   this.addressSelectedMap[0] = false;
        //   this.loadWaited = false;
        // }, err => {
        //   this.loadWaited = false;
        // })
      }
    });
  }
}
