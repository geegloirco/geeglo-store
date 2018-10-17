import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartInfoService} from "../../../service/cart-info/cart-info.service";

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  loadWaited = false;

  imagePrefix;
  items = [];

  constructor(
    private cartService: CartInfoService,
    private serverInfo: ServerInfoService,
    private modalService: NgbModal,
    private messageService: MsgsysService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    console.log("cart-view init")
    this.cartService.init('store/cart');
  }

  open(content) {
    this.items = this.cartService.getItems();
    console.log(this.items)
    this.modalService.open(content, {}).result.then((result) => {
      if(result === 1) {
      } else if (result === 2) {
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
