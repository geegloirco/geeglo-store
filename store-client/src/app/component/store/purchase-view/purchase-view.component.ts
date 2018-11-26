import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {PaymentTypeService} from "../../../service/payment-type/payment-type.service";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css']
})
export class PurchaseViewComponent implements OnInit {
  purchaseCompleted = false;

  verifyList = false;

  verifyAddress = false;
  selectedAddress = null;

  verifyPayment = false;
  selectedPayment = null;

  imagePrefix;
  items = [];
  totalPrice: number = 0;

  paymentTypes = null;
    // [
    // {id: 1, image: 'internet.png', enabled: false},
    // {id: 2, image: 'cash.png', enabled: true},
    // {id: 3, image: 'pos.png', enabled: true},
  // ]

  constructor(
    public personalityService: PersonalityService,
    public loadWaitService: LoadWaitService,
    public paymentTypeService: PaymentTypeService,
    public serverInfo: ServerInfoService,
    private modalService: NgbModal,
    private messageService: MessageService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    this.personalityService.afterCartChangedInfluencedServer().subscribe(res => {
      // console.log("cart view");
      this.paymentTypeService.getPaymentType().subscribe(res => {
        this.paymentTypes = res;
      });
      this.items = this.personalityService.getItems();
      // console.log(this.items);
      // console.log(res);
      this.totalPrice = 0;
      for(let i = 0; i< this.items.length; i++) {
        this.totalPrice += this.items[i]['price'] * this.items[i]['count'];
      }
    });
  }

  verify() {
    if(!this.verifyList) {
      this.verifyList = true;
    } else if(!this.verifyAddress) {
      if(this.selectedAddress)
        this.verifyAddress = true;
    } else if(!this.verifyPayment) {
      if(this.selectedPayment && this.selectedPayment.id > 0)
        this.verifyPayment = true;
      else
        this.verifyPayment = false;
    }
  }

  reverse() {
    if(this.verifyList && !this.verifyAddress) {
      this.verifyList = false;
    } else if(this.verifyAddress && !this.verifyPayment) {
        this.verifyAddress = null;
        this.verifyAddress = false;
    } else if(this.verifyPayment) {
      this.selectedPayment = null;
      this.verifyPayment = false;
    }
  }

  addressSelected(event) {
    console.log(event);
    this.selectedAddress = event;
  }

  paymentSelected(payment) {
    if(payment.enabled) {
      this.selectedPayment = payment;
    }
  }

  finalVerify() {
    this.loadWaitService.wait();
    this.personalityService.registerCartByAddressAndPayment(
      this.selectedPayment['id'], this.selectedAddress['id']).subscribe(res => {
      this.messageService.add("با موفقیت ثبت شد.");
      this.loadWaitService.release();
      this.purchaseCompleted = true;
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

  createArray(size) {
    let arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr[i] = i;
    }
    return arr;
  }
}
