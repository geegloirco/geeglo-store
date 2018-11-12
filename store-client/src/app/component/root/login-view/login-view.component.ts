import {Component, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";

import {NgbModal, NgbModalConfig, NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  loadWaited = false;

  isLoggedIn = false;
  mobileNo: string = "09391366128";
  password: string = "123456";
  registerPass = "";
  registerPass2 = "";
  registerMobileNo = "";
  showVerify = false;
  verifyCode: string = "";

  user: object = {image: ''};

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public serverInfo: ServerInfoService,
    private personalityService: PersonalityService,
    private messageService: MessageService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.personalityService.afterInitialized().subscribe(res => {
    }, err => {
    });
    this.personalityService.afterLoggedIn().subscribe(res => {
      if(res === LoginStatus.login) {
        this.user = this.personalityService.getUser();
        this.isLoggedIn = true;
      }
    });
  }

  tab = "tab-login";
  public beforeChange($event: NgbTabChangeEvent) {
    this.tab = $event.nextId;
    if ($event.nextId === 'tab-login') {
      // $event.preventDefault();
    }
  }

  login() {
    this.loadWaited = true;
    this.personalityService.login(this.mobileNo, this.password).subscribe(
      res => {
        // this.enableMobile = res;
        if(typeof res === 'object') {
          this.user['username'] = res['username'];
          this.user['image'] = this.serverInfo.getServerBaseUrl() + 'assets/image/user/' + res['image'];
        }
        this.loadWaited = false;
        this.isLoggedIn = true;
        // this.messageService.add('با موفقیت انجام شد.');
        this.modalService.dismissAll();
      },err => {
        this.loadWaited = false;
      });
  }

  register() {
    if(this.registerPass === this.registerPass2) {
      this.loadWaited = true;
      this.personalityService.register(this.registerMobileNo, this.registerPass).subscribe(
        res => {
          // this.enableMobile = true;
          this.showVerify = true;
          this.loadWaited = false;
        },err => {
          this.loadWaited = false;
        });
    }

    // this.messageService.add('با موفقیت انجام شد.');
  }

  sendVerify() {
    this.loadWaited = true;
    this.personalityService.verify(this.verifyCode).subscribe(
      res => {
        // this.enableMobile = true;
        this.showVerify = false;
        this.loadWaited = false;
        this.isLoggedIn = true;
        // this.messageService.add('با موفقیت انجام شد.');
        this.modalService.dismissAll();
      },err => {
        this.loadWaited = false;
      });


    // this.messageService.add('با موفقیت انجام شد.');
  }

  logout() {
    this.loadWaited = true;
    this.personalityService.logout().subscribe(
      res => {
        // this.enableMobile = res;
        this.user['username'] = '';
        this.user['image'] = '';
        this.loadWaited = false;
        this.isLoggedIn = false;
        // this.messageService.add('با موفقیت انجام شد.');
        this.modalService.dismissAll();
      },err => {
        this.loadWaited = false;
      });
  }

  clear() {
    this.loadWaited = false;

    this.mobileNo = "";
    this.password = "";
    this.registerPass = "";
    this.registerPass2 = "";
    this.registerMobileNo = "";
    this.showVerify = false;
    this.verifyCode = "";
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.clear();
    }, (reason) => {
      this.clear();
    });;
  }
}
