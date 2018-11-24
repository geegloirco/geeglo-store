import {Component, Input, OnInit} from '@angular/core';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {MapService} from "../../../service/map-service/map.service";
import {UserService} from "../../../service/user/user.service";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";

@Component({
  selector: 'user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent implements OnInit {
  userClone = null;

  userInfoModel: object = {
    id: '',
    firstName: '',
    lastName: '',
    nationalCode: '',
  };

  constructor(
    public personalityService: PersonalityService,
    public loadWaitService: LoadWaitService,
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
    this.loadWaitService.wait();
    this.personalityService.updateUserInfo(this.userInfoModel).subscribe(res => {
      this.loadWaitService.release();
      this.userInfoModel = res;
      this.userClone = JSON.parse(JSON.stringify(this.userInfoModel));
      this.messageService.add("با موفقیت انجام شد");
    }, err => {
      this.loadWaitService.release();
      this.messageService.add("با شکست مواجه شد");
    });
  }

  userInfoCancel() {
    this.userInfoModel = this.userClone;
  }
}
