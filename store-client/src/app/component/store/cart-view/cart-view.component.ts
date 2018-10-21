import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {MsgsysService} from "../../../service/msgsys/msgsys.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonalityService} from "../../../service/personality/personality.service";

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  loadWaited = false;

  imagePrefix;
  items = [];
  totalPrice: number = 0;

  constructor(
    public personalityService: PersonalityService,
    private serverInfo: ServerInfoService,
    private modalService: NgbModal,
    private messageService: MsgsysService) {
    this.imagePrefix = this.serverInfo.getServerBaseUrl() + 'assets/image/item/';
  }

  ngOnInit() {
    this.personalityService.afterCartChangedInfluencedServer().subscribe(res => {
      this.items = this.personalityService.getItems();
      this.totalPrice = 0;
      for(let i = 0; i< this.items.length; i++) {
        this.totalPrice += this.items[i]['price'] * this.items[i]['count'];
      }
    });
  }

  open(content) {
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
