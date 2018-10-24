import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './component/root/dashboard/dashboard.component';
import {RootContainerComponent} from './component/root/root-container/root-container.component';
import {ItemsViewComponent} from "./component/root/items-view/items-view.component";
import {AddressRegisterComponent} from "./component/root/address-register/address-register.component";

const routes: Routes = [
  { path: '', redirectTo: '/root/(rootContainer:dashboard/(dashboardBody:items))', pathMatch: 'full' },
  { path: 'root', component: RootContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent, outlet: 'rootContainer', children: [
          { path: 'items', component: ItemsViewComponent, outlet: 'dashboardBody' },
          { path: 'address-register', component: AddressRegisterComponent, outlet: 'dashboardBody' },
      ]},
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
