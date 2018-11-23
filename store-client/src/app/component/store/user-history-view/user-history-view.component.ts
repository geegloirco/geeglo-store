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

  verifyList = false;

  verifyAddress = false;
  selectedAddress = null;

  verifyPayment = false;
  selectedPayment = null;

  imagePrefix;
  items = [];
  totalPrice: number = 0;

  paymentTypes =[
    {id: 1, image: 'internet.png', enabled: false},
    {id: 2, image: 'cash.png', enabled: true},
    {id: 3, image: 'pos.png', enabled: true},
  ]

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

  addressSelected(event) {
    console.log(event);
    this.selectedAddress = event;
    this.verifyAddress = event != null;
  }

  paymentSelected(payment) {
    if(payment.enabled) {
      this.selectedPayment = payment;
      if(this.selectedPayment && this.selectedPayment.id > 0)
        this.verifyPayment = true;
      else
        this.verifyPayment = false;
    }

  }

  finalVerify() {
    console.log(this.selectedPayment);
    console.log(this.selectedAddress);

    this.personalityService.registerCartByAddressAndPayment(
      this.selectedPayment['id'], this.selectedAddress['id'], ).subscribe(res => {
      console.log('completed');
      this.messageService.add("با موفقیت ثبت شد.");
    }, err => {

    });
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
