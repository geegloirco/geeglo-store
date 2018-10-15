import {Component, Input, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  loadWaited = false;
  model = 1;
  count = 0;

  @Input()
  item: object = {}

  image;

  constructor(
    private serverInfo: ServerInfoService,
    private messageService: MsgsysService) {
    this.image = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
  }

  itemClick(item) {

  }
}
