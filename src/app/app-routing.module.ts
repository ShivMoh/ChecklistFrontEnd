import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTableComponent } from './main-table/main-table.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path : '', redirectTo: '/main-table', pathMatch: 'full'},
  { path: 'main-table', component: MainTableComponent},
  { path : 'history', component: HistoryComponent},
  { path: 'list/:id', component: MainTableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
