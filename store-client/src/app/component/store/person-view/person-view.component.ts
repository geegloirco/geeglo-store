import {Component, NgZone, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MapService} from "../../../service/map-service/map.service";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
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
