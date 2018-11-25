import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './component/root/dashboard/dashboard.component';
import {RootContainerComponent} from './component/root/root-container/root-container.component';
import {StoreViewComponent} from "./component/store/store-view/store-view.component";
import {OrderViewComponent} from "./component/store/order-view/order-view.component";
import {PersonViewComponent} from "./component/store/person-view/person-view.component";
import {UserAddressViewComponent} from "./component/store/user-address-view/user-address-view.component";

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
      { path: 'person', component: PersonViewComponent, outlet: 'dashboardBody'},
      { path: 'order', component: OrderViewComponent, outlet: 'dashboardBody'/*, canActivate: [PersonalityService]*/ },
      { path: 'address', component: UserAddressViewComponent, outlet: 'dashboardBody'/*, canActivate: [PersonalityService]*/ }
    ]
    },
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
