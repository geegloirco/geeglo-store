import {Component, OnInit} from '@angular/core';
import {RootContainerService} from '../root-container/root-container.component';
import {ServerInfoService} from '../../../service/server-info/server-info.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css']
})
export class NavbarViewComponent implements OnInit {
  isSmallMode = false;

  constructor(private route: ActivatedRoute,
              private rootContainerService: RootContainerService,
              public serverInfo: ServerInfoService) {
    // console.log("dashboard constructor");
    this.rootContainerService.setCallback(this.windowResized, this);
  }

  ngOnInit() {
    // console.log("dashboard ngOnInit");
  }

  windowResized(isSmall: boolean, owner: NavbarViewComponent) {
    // console.log("DashboardComponent windowResized");
    owner.isSmallMode = isSmall;
  }
}
