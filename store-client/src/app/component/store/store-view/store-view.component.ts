import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css']
})
export class StoreViewComponent implements OnInit {
  loadWaited = false;
  items = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService) {
  }

  ngOnInit() {
    console.log(this.router.url)
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        // if(!this.router.url) {
        //   this.router.navigate([{ outlets: { storeItems: ['items', 1]} }], {relativeTo: this.activatedRoute})
        // }
      }
    });
  }
}
