import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ItemInfoService} from "../../../service/item-info/item-info.service";
import {ServiceInitStatus, LoginService, LoginStatus} from "../../../service/login/login.service";

@Component({
  selector: 'setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.css']
})
export class SettingViewComponent implements OnInit {
  loadWaited = false;

  constructor(
    private loginService: LoginService,
    public serverInfo: ServerInfoService,
    private itemInfoService: ItemInfoService) {
    itemInfoService.init('store/item');
  }

  items = [];

  ngOnInit() {
    this.loginService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.itemInfoService.getItems().subscribe(res => {
          this.items = res;
        }, err => {
        });
      }
    });
  }
}
