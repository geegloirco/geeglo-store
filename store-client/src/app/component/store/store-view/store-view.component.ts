import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css']
})
export class StoreViewComponent implements OnInit {
  items = [];

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService) {
    this.router.events.subscribe(val => {
      // if(this.activatedRoute.url == val.url)
      // if(val.hasOwnProperty('url')) {
      //   this.activatedRoute.url.forEach(res => {
      //   })
      // }
    });
  }

  itemGroupId = 0;

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {

        // if(!this.router.url) {
        //   this.router.navigate([{ outlets: { storeItems: ['items', 0]} }], {relativeTo: this.activatedRoute})
        // }
      }
    });
  }
}
