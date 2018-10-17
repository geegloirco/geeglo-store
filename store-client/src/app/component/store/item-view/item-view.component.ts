import {Component, Input, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartInfoService} from "../../../service/cart-info/cart-info.service";
import {ServiceInitStatus} from "../../../service/login/login.service";

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

  imagePrefix;

  constructor(
    private cartService: CartInfoService,
    private modalService: NgbModal,
    private serverInfo: ServerInfoService,
    private messageService: MsgsysService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    this.count = this.item['count'];
    this.cartService.init('store/cart');
    this.cartService.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.cartService.fillCount(this.item);
        this.count = this.item['count'];
      }
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
        this.count = 0;
      } else if (result === 2) {
        this.loadWaited = true;
        this.cartService.changeToCart(this.item, this.count).subscribe(res => {
          this.messageService.add("اضافه شد")
          this.item['count'] = res;
          this.loadWaited = false;
        }, err => {
          this.messageService.add(err);
          this.loadWaited = false;
        });
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
