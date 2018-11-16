import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './component/root/dashboard/dashboard.component';
import {RootContainerComponent} from './component/root/root-container/root-container.component';
import {ItemsViewComponent} from "./component/store/items-view/items-view.component";
import {UserInfoComponent} from "./component/root/user-info/user-info.component";
import {StoreViewComponent} from "./component/store/store-view/store-view.component";
import {OrderViewComponent} from "./component/store/order-view/order-view.component";

// const routes: Routes = [
//   { path: '', redirectTo: '/root/(rootContainer:dashboard/(dashboardBody:store/(storeItems:items)))', pathMatch: 'full' },
//   { path: 'root', component: RootContainerComponent, children: [
//       { path: 'dashboard', component: DashboardComponent, outlet: 'rootContainer', children: [
//         { path: 'store', component: StoreViewComponent, outlet: 'dashboardBody', children: [
//               {path: 'items', component: ItemsViewComponent, outlet: 'storeItems'}
//             ]
//         },
//         { path: 'user-info', component: UserInfoComponent, outlet: 'dashboardBody'},
//         { path: 'order', component: OrderViewComponent, outlet: 'dashboardBody'/*, canActivate: [PersonalityService]*/ }
//         ]
//       },
//   ]},
// ];

const routes: Routes = [
  { path: '', redirectTo: '/root/(rootContainer:dashboard/(dashboardBody:store))', pathMatch: 'full' },
  { path: 'root', component: RootContainerComponent, children: [
    { path: 'dashboard', component: DashboardComponent, outlet: 'rootContainer', children: [
      { path: 'store', component: StoreViewComponent, outlet: 'dashboardBody'},
      { path: 'user-info', component: UserInfoComponent, outlet: 'dashboardBody'},
      { path: 'order', component: OrderViewComponent, outlet: 'dashboardBody'/*, canActivate: [PersonalityService]*/ }
    ]
    },
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
