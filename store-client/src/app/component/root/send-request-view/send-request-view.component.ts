import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../service/message/message.service';
import {ServerInfoService} from '../../../service/server-info/server-info.service';

@Component({
  selector: 'send-request-view',
  templateUrl: './send-request-view.component.html',
  styleUrls: ['./send-request-view.component.css']
})
export class SendRequestViewComponent implements OnInit {
  messageContent: string = "";
  messageTitle: string = "";

  thirdParties: object[] = [];
  selectedThirdParty: object = {};

  allProfiles: boolean = false;
  profiles: object[] = [];
  profileMap = new Map()
  selectedProfiles: object[] = [];

  loadWaited = false;
  model = 1;

  constructor(
    private serverInfo: ServerInfoService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.init(this.serverInfo.getServerContextUrl() + 'resources/message/message/');
    // this.thirdPartyService.init("geofenceWAR/resources/message/third-party/")
  }

  newTerminal() {

  }
}
