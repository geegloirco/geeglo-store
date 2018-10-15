import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './component/root/dashboard/dashboard.component';
import {RootContainerComponent} from './component/root/root-container/root-container.component';
import {SendRequestViewComponent} from './component/root/send-request-view/send-request-view.component';
import {PursueRequestViewComponent} from './component/root/pursue-request-view/pursue-request-view.component';
import {SettingViewComponent} from "./component/root/setting-view/setting-view.component";

const routes: Routes = [
  { path: '', redirectTo: '/root/(rootContainer:dashboard/(dashboardBody:pursue-request))', pathMatch: 'full' },
  { path: 'root', component: RootContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent, outlet: 'rootContainer', children: [
          { path: 'setting', component: SettingViewComponent, outlet: 'dashboardBody' },
          { path: 'send-request', component: SendRequestViewComponent, outlet: 'dashboardBody' },
          { path: 'pursue-request', component: PursueRequestViewComponent, outlet: 'dashboardBody' },
      ]},
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
