import {Component, OnInit} from '@angular/core';
import {RootContainerService} from '../root-container/root-container.component';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ActivatedRoute} from '@angular/router';
import {LoginStatus, PersonalityService, ServiceInitStatus} from "../../../service/personality/personality.service";
import {MessageService} from "../../../service/message/message.service";

@Component({
  selector: 'footer-view',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterViewComponent implements OnInit {
  isSmallMode = false;
  loadWaited = true;

  constructor(private route: ActivatedRoute,
              private personalityServiceper: PersonalityService,
              public messageService: MessageService,
              private rootContainerService: RootContainerService,
              public serverInfo: ServerInfoService) {
    // console.log("dashboard constructor");
    this.rootContainerService.afterResize().subscribe(res => {
      this.isSmallMode = res['isSmall'];
    })
    // this.rootContainerService.setCallback(this.windowResized, this);
  }

  ngOnInit() {
    this.personalityServiceper.afterInitialized().subscribe(res => {
      if(res === ServiceInitStatus.successed)
        this.loadWaited = false;
    });
    // console.log("dashboard ngOnInit");
  }

  // windowResized(isSmall: boolean, owner: FooterViewComponent) {
  //   console.log("DashboardComponent windowResized");
    // owner.isSmallMode = isSmall;
  // }
}
