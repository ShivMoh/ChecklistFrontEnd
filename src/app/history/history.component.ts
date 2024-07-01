import { Component } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';

import { Router } from '@angular/router';
import { KitchenCheckList } from '../models/kitchen-check-list/kitchen-check-list';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  lists : string[] = [
    "Kitchen checklist form",
    "Service checklist form",
    "Cashier checklist form",
    "Stock opening check list",
  ];

  constructor(private mainService : MainServiceService, private router : Router) {

  }

  ngOnInit() {
  
  }

  navigate(id : any) {
    // console.log(id)
    this.router.navigate(["/list", id]);
  }

  select(index: any) {
    this.router.navigate(["/history-list", index]);
  }
}
