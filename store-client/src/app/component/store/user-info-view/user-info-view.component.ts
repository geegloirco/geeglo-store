import {Component, Input, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {MapService} from "../../../service/map-service/map.service";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent implements OnInit {
  loadWaited = false;
  userClone = null;

  userInfoModel: object = {
    id: '',
    firstName: '',
    lastName: '',
    nationalCode: '',
  };

  constructor(
    public personalityService: PersonalityService,
    private serverInfo: ServerInfoService,
    private modalService: NgbModal,
    private userService: UserService,
    private messageService: MessageService) {

  }

  ngOnInit() {
    this.personalityService.afterLoggedIn().subscribe(res => {
      if(res === LoginStatus.login)
      this.userService.getUserInfo().subscribe(res => {
        this.userInfoModel = res;
        this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));
      }, err => {

      })
    });
  }

  userInfoRegister() {
    this.loadWaited = true;
    this.personalityService.updateUserInfo(this.userInfoModel).subscribe(res => {
      this.loadWaited = false;
      this.userInfoModel = res;
      this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));
      this.messageService.add("با موفقیت انجام شد");
    }, err => {
      this.loadWaited = false;
      this.messageService.add("با شکست مواجه شد");
    });
  }

  userInfoCancel() {
    this.userInfoModel = this.userClone;
  }
}
