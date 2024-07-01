import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KitchenCheckList } from '../../models/kitchen-check-list/kitchen-check-list';
import { KitchenCheckListService } from '../../services/kitchen-check-list.service';
import { ServiceCheckListService } from '../../services/service-check-list.service';
import { CashierCheckListService } from '../../services/cashier-check-list.service';
import { StockOpeningCheckListService } from '../../services/stock-opening-check-list.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {

  index : number = 0;
  lists : any[] = [];
  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private kitchenService : KitchenCheckListService,
    private serviceService : ServiceCheckListService,
    private cashierService : CashierCheckListService,
    private stockService : StockOpeningCheckListService
  ) {

  }
  ngOnInit() {
    this.index = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.fillLists();
  }

  fillLists() {
    switch (this.index) {
      case 0:
        this.kitchenService.getAllLists().subscribe(lists => {
          this.lists = lists;
        })
        break;
    
      case 1:
        this.serviceService.getAllLists().subscribe(lists => {
          this.lists = lists;
        })
        break;
      case 2:
        this.cashierService.getAllLists().subscribe(lists => {
          console.log(lists)
          this.lists = lists;
        })
        break;
      case 3:
        this.stockService.getAllLists().subscribe(lists => {
          this.lists = lists;
        })
        break;      
      default:
        break;
    }
  }

  select(id : string) {
    switch (this.index) {
      case 0:
        this.router.navigate(["/kitchen-list", id]);        
        break;
      case 1:
        this.router.navigate(["/service-list", id]);        
        break;
      case 2:
        console.log("this is running???");
        this.router.navigate(["/cashier-list", id]);        
        break;
      case 3:
        this.router.navigate(["/stock-opening-list", id]);        
        break;      
      default:
        break;
    }
  }
}
