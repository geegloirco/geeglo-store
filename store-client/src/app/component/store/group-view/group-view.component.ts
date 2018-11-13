import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {GroupService} from "../../../service/group/group.service";

@Component({
  selector: 'group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {
  loadWaited = false;
  groups = [];

  constructor(
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private groupService: GroupService) {
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.groupService.getGroups().subscribe(res => {
          this.groups = res;
        }, err => {
        });
      }
    });
  }
}
