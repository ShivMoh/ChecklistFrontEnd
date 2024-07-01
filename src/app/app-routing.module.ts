import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './main-table/main-table.component';
import { HistoryComponent } from './history/history.component';
import { KitchenCheckListComponent } from './forms/kitchen-check-list/kitchen-check-list.component';
import { ServiceCheckListComponent } from './forms/service-check-list/service-check-list.component';
import { CashierCheckListComponent } from './forms/cashier-check-list/cashier-check-list.component';
import { StockOpeningCheckListComponent } from './forms/stock-opening-check-list/stock-opening-check-list.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [
  { path: 'main-table', component: MainTableComponent},
  { path : 'history', component: HistoryComponent},
  { path: 'kitchen-check-list', component: KitchenCheckListComponent},
  { path: 'service-check-list', component: ServiceCheckListComponent},
  { path: 'cashier-check-list', component: CashierCheckListComponent},
  { path: 'stock-opening-check-list', component: StockOpeningCheckListComponent},
  { path: 'forms', component: FormsComponent},

  { path: 'list/:id', component: MainTableComponent},
  { path : '', redirectTo: '/forms', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
