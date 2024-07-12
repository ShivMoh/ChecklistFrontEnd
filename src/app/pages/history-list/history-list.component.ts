import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KitchenCheckList } from '../../models/kitchen-check-list/kitchen-check-list';
import { KitchenCheckListService } from '../../services/kitchen-check-list.service';
import { ServiceCheckListService } from '../../services/service-check-list.service';
import { CashierCheckListService } from '../../services/cashier-check-list.service';
import { StockOpeningCheckListService } from '../../services/stock-opening-check-list.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {

  index : number = 0;
  paginationIndex : number = 0;
  lists : any[] = [];
  fullList : any[] = [];
  filteredList : any[] = [];

  monthIndex : Number = -1;
  dayIndex : Number = -1;

  days : string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ]

  months : string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private kitchenService : KitchenCheckListService,
    private serviceService : ServiceCheckListService,
    private cashierService : CashierCheckListService,
    private stockService : StockOpeningCheckListService,
    private datePipe : DatePipe
  ) {

  }

  ngOnInit() {
    this.index = Number(this.activatedRoute.snapshot.paramMap.get('index'));

    this.fillLists();

  
  }

  getNthList(lists : any[], number : number = 10) {
    var start = Math.max(Number(this.paginationIndex) * number, 0);
    var end = Math.min(start + number, lists.length);
    return lists.slice(start, end);
  }

  filter(event : any) {
    const selectElement = event.target as HTMLSelectElement;
    const index = selectElement.value;
    const name = selectElement.name;

    
    if (name == "month") {
      if(this.dayIndex != -1) { 
        var retList = []
        retList = this.filterByDay(this.fullList, this.dayIndex);
        this.lists = this.filterByMonth(retList, Number(index));        
        this.lists = this.getNthList(this.lists);

      } else {
        this.lists = this.filterByMonth(this.fullList, Number(index));
        this.lists = this.getNthList(this.lists);

      }
    }

    if (name == "day") {
      if(this.monthIndex != -1) { 
        var retList = []
        retList = this.filterByMonth(this.fullList, this.monthIndex);
        this.lists = this.filterByDay(retList, Number(index));
        this.lists = this.getNthList(this.lists);
      } else {
        this.lists = this.filterByDay(this.fullList, Number(index));
        this.lists = this.getNthList(this.lists);
      }
    }

  }


  clear() {
    this.dayIndex = -1;
    this.monthIndex = -1;
    this.fillLists();
    location.reload();
  }

  filterByMonth(lists : any[], monthIndex : any) {
    

    this.filteredList = [];
    

    lists.map((list) => {
      var month = this.datePipe.transform(new Date(list.endDate), "M");
      if (Number(month) == Number(monthIndex) + 1){
        this.filteredList.push(list);
      }
    })

 
    this.monthIndex = Number(monthIndex);

    console.log(this.filteredList);
    return this.filteredList;
  }

  filterByDay(lists : any[], dayIndex : any)
   {
    
    

    this.filteredList = [];
  
    lists.map((list) => {
      var day = this.datePipe.transform(new Date(list.endDate), "E");
      console.log(day);
      if (this.days.indexOf(day!) == Number(dayIndex)){
        this.filteredList.push(list);
      }
    })


    this.dayIndex = Number(dayIndex);
    return this.filteredList;
  }

  canGoBack() {
    return this.paginationIndex != 0;
  }

  canGoForward() {
    return (this.paginationIndex + 1) * 10 < this.filteredList.length;
  }

  incrementIndex() {
    this.paginationIndex = this.paginationIndex + 1;
    this.fillLists();
  }

  decrementIndex() {
    this.paginationIndex = this.paginationIndex - 1;
    this.fillLists();
  }

  fillLists() {
    switch (this.index) {
      case 0:
        this.kitchenService.getAllLists().subscribe(lists => {
          this.fullList = lists;
          this.filteredList = lists;
          this.lists = this.getNthList(lists);
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
