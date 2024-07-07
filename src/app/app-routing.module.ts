import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './main-table/main-table.component';
import { HistoryComponent } from './history/history.component';
import { KitchenCheckListComponent } from './forms/kitchen-check-list/kitchen-check-list.component';
import { ServiceCheckListComponent } from './forms/service-check-list/service-check-list.component';
import { CashierCheckListComponent } from './forms/cashier-check-list/cashier-check-list.component';
import { StockOpeningCheckListComponent } from './forms/stock-opening-check-list/stock-opening-check-list.component';
import { FormsComponent } from './pages/forms/forms.component';
import { HistoryListComponent } from './pages/history-list/history-list.component';
import { adminGuard } from './guards/admin.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'main-table', component: MainTableComponent},
  { path : 'history', component: HistoryComponent, canActivate: [adminGuard]},
  { path : 'login', component: LoginComponent},
  { path: 'kitchen-check-list', component: KitchenCheckListComponent},
  { path: 'service-check-list', component: ServiceCheckListComponent},
  { path: 'cashier-check-list', component: CashierCheckListComponent},
  { path: 'stock-opening-check-list', component: StockOpeningCheckListComponent},
  { path: 'forms', component: FormsComponent},
  { path: 'history-list/:id', component: HistoryListComponent},
  { path: 'kitchen-list/:id', component: KitchenCheckListComponent},
  { path: 'service-list/:id', component: ServiceCheckListComponent},
  { path: 'cashier-list/:id', component: CashierCheckListComponent},
  { path: 'stock-opening-list/:id', component: StockOpeningCheckListComponent},
  
  { path : '', redirectTo: '/forms', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
