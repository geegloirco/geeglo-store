import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {latLng, Map, tileLayer} from "leaflet";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";

@Component({
  selector: 'items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  items = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadWaitService: LoadWaitService,
    private personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.activatedRoute.queryParams.subscribe(res => {
          // console.log(res);
          this.loadWaitService.wait();
          this.itemInfoService.getItems(res['groupId'] || 0).subscribe(res => {
            this.items = res;
            this.loadWaitService.release();
          }, err => {
            this.loadWaitService.release();
          });
        })
        // this.activatedRoute.params.subscribe(res => {
        //   this.itemInfoService.getItems(res['groupId']).subscribe(res => {
        //     this.items = res;
        //   }, err => {
        //   });
        // })
      }
    });
  }
}
