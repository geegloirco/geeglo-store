import {Component, OnInit} from '@angular/core';
import {RootContainerService} from '../root-container/root-container.component';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ActivatedRoute} from '@angular/router';
import {LoginStatus, PersonalityService} from "../../../service/personality/personality.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css']
})
export class NavbarViewComponent implements OnInit {
  isSmallMode = false;
  isLoggedIn = true;

  constructor(private route: ActivatedRoute,
              private rootContainerService: RootContainerService,
              private personalityService: PersonalityService,
              public serverInfo: ServerInfoService) {
    // console.log("dashboard constructor");
    this.rootContainerService.setCallback(this.windowResized, this);
  }

  ngOnInit() {
    // console.log("dashboard ngOnInit");
      this.personalityService.afterLoggedIn().subscribe(res => {
          if(res === LoginStatus.login) {
              this.isLoggedIn = true;
          }
      });
  }

  windowResized(isSmall: boolean, owner: NavbarViewComponent) {
    // console.log("DashboardComponent windowResized");
    owner.isSmallMode = isSmall;
  }
}
