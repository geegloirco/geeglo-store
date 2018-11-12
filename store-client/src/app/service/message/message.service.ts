import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable()
export class MessageService {
  lastMessageId: number = 1;
  private appearMessage: BehaviorSubject<MessageStruct> = new BehaviorSubject(null);
  private disappearMessage: BehaviorSubject<number> = new BehaviorSubject(null);

  afterAppear() {
    return this.appearMessage;
  }

  afterDisappear() {
    return this.disappearMessage;
  }

  constructor() { }

  add(message: string) {
    let id = this.lastMessageId++;
    let msg = new MessageStruct(id, message);
    this.appearMessage.next(msg);
    setTimeout(()=>{
      this.disappearMessage.next(id);
    }, 1000000);
  }

  remove(id) {
    this.disappearMessage.next(id);
  }
}

export class MessageStruct {
  id: number;
  message: string;

  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
  }
}
