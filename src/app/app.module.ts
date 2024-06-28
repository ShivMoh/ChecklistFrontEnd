import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './history/history.component';
import { DatePipe } from '@angular/common';
import { KitchenCheckListComponent } from './forms/kitchen-check-list/kitchen-check-list.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// angular material imports
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatTabsModule} from '@angular/material/tabs'

import { ServiceCheckListComponent } from './forms/service-check-list/service-check-list.component';
import { CashierCheckListComponent } from './forms/cashier-check-list/cashier-check-list.component';
import { StockOpeningCheckListComponent } from './forms/stock-opening-check-list/stock-opening-check-list.component'

@NgModule({
  declarations: [
    AppComponent,
    MainTableComponent,
    HistoryComponent,
    KitchenCheckListComponent,
    UploadComponent,
    ProgressBarComponent,
    ServiceCheckListComponent,
    CashierCheckListComponent,
    StockOpeningCheckListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DatePipe,

    // angular materials
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [
    DatePipe,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
