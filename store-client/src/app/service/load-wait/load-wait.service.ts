import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable()
export class LoadWaitService {
  private loadWaitSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  waitNumber = 0;

  changeState(): BehaviorSubject<boolean> {
    return this.loadWaitSubject;
  }

  constructor() { }

  wait() {
    if(this.waitNumber == 0) {
      this.waitNumber++;
      this.loadWaitSubject.next(true);
    } else {
      this.waitNumber++;
    }

  }

  release() {
    if(this.waitNumber == 1) {
      this.waitNumber--;
      this.loadWaitSubject.next(false);
    } else {
      this.waitNumber--;
    }
  }
}
