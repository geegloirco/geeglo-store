import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  loadWaited = false;

  verifyList = false;
  verifyAddress = false;
  verifyPayment = false;

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
    this.personalityService.afterCartChangedInfluencedServer().subscribe(res => {
      // console.log("cart view");
      this.items = this.personalityService.getItems();
      // console.log(this.items);
      // console.log(res);
      this.totalPrice = 0;
      for(let i = 0; i< this.items.length; i++) {
        this.totalPrice += this.items[i]['price'] * this.items[i]['count'];
      }
    });
  }

  addressSelected($event) {
    this.verifyAddress = $event;
  }

  open(content) {
    this.modalService.open(content, {}).result.then((result) => {
      // console.log('register cart');
      // console.log(result);
      if(result === 1) {
        this.personalityService.registerCart().subscribe(res => {

        }, err => {

        });
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
  }
}
