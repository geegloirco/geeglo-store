import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './component/root/dashboard/dashboard.component';
import {RootContainerComponent} from './component/root/root-container/root-container.component';
import {ItemsViewComponent} from "./component/store/items-view/items-view.component";
import {UserInfoComponent} from "./component/root/user-info/user-info.component";
import {StoreViewComponent} from "./component/store/store-view/store-view.component";

const routes: Routes = [
  { path: '', redirectTo: '/root/(rootContainer:dashboard/(dashboardBody:store))', pathMatch: 'full' },
  { path: 'root', component: RootContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent, outlet: 'rootContainer', children: [
          { path: 'store', component: StoreViewComponent, outlet: 'dashboardBody', children: [
              {path: 'items/:groupId', component: ItemsViewComponent, outlet: 'storeItems'}
            ]
          },
          { path: 'user-info', component: UserInfoComponent, outlet: 'dashboardBody', /*canActivate: [PersonalityService]*/ }
        ]
      },
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
