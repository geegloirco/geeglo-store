import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../service/message/message.service';
import {ServerInfoService} from '../../../service/server-info/server-info.service';

@Component({
  selector: 'pursue-request-view',
  templateUrl: './pursue-request-view.component.html',
  styleUrls: ['./pursue-request-view.component.css']
})
export class PursueRequestViewComponent implements OnInit {
  messageContent: string = "";
  messageTitle: string = "";
  regAmount: number = 0;
  regBalance: number = 0;
  regDate: string = "";
  regTime: string = "";
  mccs: object[] = [];
  regMcc: string = '';
  types: object[] = [];
  regType: object = {};
  thirdParties: object[] = [];
  selectedThirdParty: object = {};

  allProfiles: boolean = false;
  profiles: object[] = [];
  profileMap = new Map()
  selectedProfiles: object[] = [];

  loadWaited = false;

  constructor(
    private serverInfo: ServerInfoService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.init(this.serverInfo.getServerContextUrl() + 'resources/message/message/');
  }

  thirdPartySelect(thirdParty) {
    if(this.selectedThirdParty == thirdParty)
      this.selectedThirdParty = {};
    else
      this.selectedThirdParty = thirdParty;
  }

  thirdPartyCancel(e) {
    console.log(e);
    this.selectedThirdParty = {};
  }

  profileSelect(profile) {
    if (this.profileMap.has(profile['mobile'])) {
      this.profileMap.delete(profile['mobile']);
      let index: number = this.selectedProfiles.indexOf(profile);
      if (index !== -1) {
        this.selectedProfiles.splice(index, 1);
      }
    } else {
      this.profileMap.set(profile['mobile'], profile);
      this.selectedProfiles.push(profile);
    }
  }

  profileCancel() {
    this.profileMap = new Map();
    this.selectedProfiles = [];
  }

  isSelectProfile(profile) {
    return this.profileMap.has(profile['mobile']);
  }

  registerMessage() {
    this.loadWaited = true;
    this.messageService.save2(this.messageTitle, this.messageContent,
      this.selectedThirdParty['code'], this.allProfiles,
      this.selectedProfiles,
      this.regAmount, this.regBalance,
      this.regDate, this.regTime,
      this.regMcc['code'], this.regType['code']).subscribe(
        res => {
          console.log("با موفقیت انجام شد");
          // this.messageContent = "";
          // this.messageTitle = "";

          // this.thirdParties = [];
          // this.selectedThirdParty = {};

          // this.allProfiles = false;
          // this.profiles = [];
          // this.profileMap = new Map()
          // this.selectedProfiles = [];

          this.loadWaited = false;
        }, err => {
        this.loadWaited = false;
        console.log("با شکست مواجه شد");
      });
  }

  refreshThirdParties() {
  }

  refreshProfileModal() {
    console.log("loadProfileModal !!!!!!!!!");
    // this.profileService.getProfile().subscribe(
    //   res => {
    //     this.profiles = res;
    //   }, err => {
    //     console.log(err);
    //   }
    // );
  }
}
