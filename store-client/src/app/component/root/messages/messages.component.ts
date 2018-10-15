import { Component, OnInit } from '@angular/core';
import {MsgsysService} from '../../../service/msgsys/msgsys.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MsgsysService) { }

  ngOnInit() {
  }

}
