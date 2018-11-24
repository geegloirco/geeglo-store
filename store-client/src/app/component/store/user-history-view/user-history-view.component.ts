import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history-view.component.html',
  styleUrls: ['./user-history-view.component.css']
})
export class UserHistoryViewComponent implements OnInit {
  loadWaited = false;

  imagePrefix;
  items = [];
  totalPrice: number = 0;

  constructor(
    public personalityService: PersonalityService,
    public serverInfo: ServerInfoService,
    private modalService: NgbModal,
    private messageService: MessageService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    this.personalityService.afterLoggedIn().subscribe(res => {
      // console.log("cart view");
      this.personalityService.getHistory().subscribe(res => {
        this.items = res;
      });
    });
  }
}
