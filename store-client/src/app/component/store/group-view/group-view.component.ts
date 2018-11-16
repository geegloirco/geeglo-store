import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {GroupService} from "../../../service/group/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowResizeService} from "../../../service/window-resize/window-resize.service";
import {RootContainerService} from "../../root/root-container/root-container.component";

@Component({
  selector: 'group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {
  loadWaited = false;
  groups = [];
  imagePrefix;
  isSmall = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resizeService: RootContainerService,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private groupService: GroupService) {
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/group/';

        this.resizeService.afterResize().subscribe(res => {
          this.isSmall = res['isSmall'];
        })

        this.groupService.getGroups().subscribe(res => {
          this.groups = res;
        }, err => {
        });
      }
    });
  }

  navig(id) {
    // [routerLink]="[{ outlets: { storeItems: ['items', group['id']]} }]"
    // [routerLink]="['../store', group['id']]"
    // routerLinkActive="selected-group"
    // [routerLink]="['../' +  +group['id']]"
    //   this.router.navigate(["../" + +id], {relativeTo: this.activatedRoute})
  }


  clicked() {
  }
}
