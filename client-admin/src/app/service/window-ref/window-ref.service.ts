import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerInfoService} from '../server-info/server-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CanActivate} from "@angular/router";
import {PersonalityService} from "../personality/personality.service";

function _window(): any {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowRefService {
  constructor() {
  }

  get nativeWindow(): any {
    return _window();
  }
}
