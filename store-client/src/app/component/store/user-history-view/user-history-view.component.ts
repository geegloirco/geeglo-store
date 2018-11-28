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
  imagePrefix;
  items = [];
  history = null;
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

  createArray(size) {
    // console.log(size)
    let arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr[i] = i;
    }
    return arr;
  }

  open(content, cartDetail) {
    console.log(cartDetail);
    this.personalityService.findCartHistory(cartDetail['id']).subscribe(res => {
      console.log(res);
      this.history = res;
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        // console.log('register cart');
        // console.log(result);
        if (result === 1) {
          // this.personalityService.registerCart().subscribe(res => {
          //
          // }, err => {
          //
          // });
        }
      }, (reason) => {
        if (reason === ModalDismissReasons.ESC) {
          // console.log('by pressing ESC');
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          // console.log('by clicking on a backdrop');
        } else {
          // console.log(`with: ${reason}`);
        }
      });
    });
  }
}
