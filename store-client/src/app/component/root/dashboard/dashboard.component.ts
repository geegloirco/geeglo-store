import {Component, OnInit} from '@angular/core';
import {RootContainerService} from '../root-container/root-container.component';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ActivatedRoute} from '@angular/router';
import {LoginStatus, PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";
import {LoadWaitService} from "../../../service/load-wait/load-wait.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSmallMode = false;
  loadWaited = true;

  constructor(private route: ActivatedRoute,
              private loadWaitService: LoadWaitService,
              private personalityServiceper: PersonalityService,
              public messageService: MessageService,
              private rootContainerService: RootContainerService,
              public serverInfo: ServerInfoService) {
    // console.log("dashboard constructor");
    this.rootContainerService.setCallback(this.windowResized, this);

  }

  ngOnInit() {
    this.loadWaitService.changeState().subscribe(res => {
      console.log(res)
      this.loadWaited = res;
    });
    this.loadWaitService.wait();
    this.personalityServiceper.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed) {
        this.loadWaitService.release();
      }
    });
    // console.log("dashboard ngOnInit");
  }

  windowResized(isSmall: boolean, owner: DashboardComponent) {
    // console.log("DashboardComponent windowResized");
    owner.isSmallMode = isSmall;
  }
}
