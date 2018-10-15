import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";

@Component({
  selector: 'setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.css']
})
export class SettingViewComponent implements OnInit {
  loadWaited = false;

  constructor(
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }

  items = [];
  image = '';

  ngOnInit() {
    this.itemInfoService.getItems().subscribe(res => {
      this.items = res;
    }, err => {
    });
    this.image = this.serverInfo.getServerBaseUrl() + 'assets/image/user/';
  }
}
