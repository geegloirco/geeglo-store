import { Component, OnInit } from '@angular/core';

import {MessageService, MessageStruct} from "../../../service/message/message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: MessageStruct[] = [];
  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messageService.afterAppear().subscribe(msg => {
      if(msg) {
        this.messages.push(msg);
        if(this.messages.length > 5)
          this.messages.splice(0, 1);
      }
    });

    this.messageService.afterDisappear().subscribe(id => {
      let selected = null;
      for(let m of this.messages) {
        if(m['id'] === id) {
          selected = m;
          break;
        }
      }
      if(selected) {
        const index: number = this.messages.indexOf(selected);
        this.messages.splice(index, 1);
      }
    });
  }

}
