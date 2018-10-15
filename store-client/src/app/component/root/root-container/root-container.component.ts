import {Component, HostListener, Injectable, OnInit} from '@angular/core';

function _window(): any {
  // return the native window obj
  return window;
}

class CallbackObject {
  callback: (isSmall: boolean, owner: Object) => void;
  owner: Object;
}

class CallbackObject2 {
  callback: (isSmall: boolean, size, owner: Object) => void;
  owner: Object;
}

@Injectable()
export class WindowRef {
  constructor() {}

  get nativeWindow(): any {
    return _window();
  }
}

@Injectable()
export class RootContainerService {
  isSmall = true;
  isInit = false;
  currentSize = {width: 0, height: 0};
  callbacks: CallbackObject[] = [];
  callbacks2: CallbackObject2[] = [];

  constructor(private windowRef: WindowRef) {
    this.init({
      width: windowRef.nativeWindow.innerWidth,
      height: windowRef.nativeWindow.innerHeight
    });
  }

  init(size) {
    this.currentSize = size;
    if(size.width < 768) {
      this.isSmall = true;
      for(let callback of this.callbacks) {
        callback.callback(this.isSmall, callback.owner);
      }
    } else {
      this.isSmall = false;
      for(let callback of this.callbacks) {
        callback.callback(this.isSmall, callback.owner);
      }
    }
  }

  setMode(size) {
    this.currentSize = size;
    if (size.width < 768) {
      if (this.isSmall === false) {
        this.isSmall = true;
        for (let callback of this.callbacks) {
          callback.callback(this.isSmall, callback.owner);
        }
      }
    } else {
      if (this.isSmall === true) {
        this.isSmall = false;
        for (let callback of this.callbacks) {
          callback.callback(this.isSmall, callback.owner);
        }
      }
    }

    for (let callback of this.callbacks2) {
      callback.callback(this.isSmall, size, callback.owner);
    }
  }

  setCallback(callback: (isSmall: boolean, owner: Object) => void, owner: Object) {
    this.callbacks.push({callback: callback, owner: owner});
    callback(this.isSmall, owner);
  }

  setCallback2(callback: (isSmall: boolean, size, owner: Object) => void, owner: Object) {
    this.callbacks2.push({callback: callback, owner: owner});
    callback(this.isSmall, this.currentSize, owner);
  }

  isModeSmall(): boolean {
    return this.isSmall;
  }

}

@Component({
  selector: 'root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.css']
})
export class RootContainerComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log("onResize")
    this.rootContainerService.setMode({
      width: event.target.innerWidth,
      height: event.target.innerHeight
    });
  }

  constructor(
    private rootContainerService: RootContainerService) {
  }

  ngOnInit() {
  }
}
