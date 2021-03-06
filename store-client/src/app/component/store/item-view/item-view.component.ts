import {Component, Input, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";

import {LoadWaitService} from "../../../service/load-wait/load-wait.service";

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  model = 1;
  count = 0;

  @Input()
  item: object = {}

  imagePrefix;

  constructor(
    private personalityService: PersonalityService,
    private loadWaitService: LoadWaitService,
    private modalService: NgbModal,
    private serverInfo: ServerInfoService,
    private messageService: MessageService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    this.count = this.item['count'];
    this.personalityService.afterCartChangedInfluencedServer().subscribe(res => {
      // console.log("item-view afterCartChangedInfluencedServer")
      // console.log(res)
      this.personalityService.fillCount(this.item);
      this.count = this.item['count'];
    });

  }

  incCount() {
    this.count++;
  }

  decCount() {
    this.count--;
    if(this.count < 0)
      this.count = 0;
  }

  itemClick(item) {

  }

  open(content) {
    this.modalService.open(content, {}).result.then((result) => {
      if(result === 1) {
        this.count = this.item['count'];
      } else if (result === 2) {
        if(this.count !== this.item['count']) {
          this.loadWaitService.wait();
          this.personalityService.changeToCart(this.item, this.count).subscribe(res => {
            this.messageService.add("اضافه شد")
            this.item['count'] = res['count'];
            this.loadWaitService.release();
          }, err => {
            this.messageService.add(err);
            this.loadWaitService.release();
          });
        }
      }
    }, (reason) => {
      if (reason === ModalDismissReasons.ESC) {
        console.log('by pressing ESC');
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        console.log('by clicking on a backdrop');
      } else {
        console.log(`with: ${reason}`);
      }
    });
  }
}
