import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";

import {NgbModal, NgbModalConfig, NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "../../../service/message/message.service";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  isLoggedIn = false;
  username: string = "admin";
  password: string = "AsadMasad@1366";

  constructor(
      private router: Router,
      private activateRoute: ActivatedRoute,
      private loadWaitService: LoadWaitService,
      public serverInfo: ServerInfoService,
      private personalityService: PersonalityService,
      private messageService: MessageService) {
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
    }, err => {
    });
    this.personalityService.afterLoggedIn().subscribe(res => {
      if(res === LoginStatus.login) {
        this.isLoggedIn = true;
      }
    });
  }

  login() {
    this.loadWaitService.wait();
    this.personalityService.login(this.username, this.password).subscribe(
      res => {
        // this.enableMobile = res;
        this.loadWaitService.release();
        this.isLoggedIn = true;
        this.router.navigate(['../store'], { relativeTo: this.activateRoute })
        // this.messageService.add('با موفقیت انجام شد.');
      },err => {
        this.loadWaitService.release();
      });
  }

  logout() {
    this.loadWaitService.wait();
    this.personalityService.logout().subscribe(
      res => {
        // this.enableMobile = res;
        this.loadWaitService.release();
        this.isLoggedIn = false;
        // this.messageService.add('با موفقیت انجام شد.');
      },err => {
        this.loadWaitService.release();
      });
  }

  clear() {
    console.log('clear');
    // this.loadWaitService.release();

    this.username = "";
    this.password = "";
  }
}
