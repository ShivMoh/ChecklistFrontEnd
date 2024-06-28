import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StockOpeningCheckList } from '../../models/stock-opening-check-list';
import { StockOpeningCheckListService } from '../../services/stock-opening-check-list.service';

@Component({
  selector: 'app-stock-opening-check-list',
  templateUrl: './stock-opening-check-list.component.html',
  styleUrl: './stock-opening-check-list.component.scss'
})
export class StockOpeningCheckListComponent {
  instance : boolean = false;
  mainList: StockOpeningCheckList = {
    id: "",
    beverages: false,
    checkUtensils: false,
    towels: false,
    coldCups: false,
    condiments: false,
    ramenBar: false,
    straws: false,
    tissuesPacks: false,
    tissues: false,
    teaBags: false,
    takeoutBox: false,
    comment: {
      comment: ""
    },
    date: "",
    signature: {
      name: '',
      date: ''
    }

  };
  
  constructor(private mainService : StockOpeningCheckListService, 
              private activatedRoute : ActivatedRoute,
              private datePipe : DatePipe
            ) {
    
  }

  ngOnInit() {
    this.getList();
    this.mainList.date = this.datePipe.transform(new Date().toString(), "yyyy-MM-dd")!;
  }

  getList() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id == undefined || id==null) {
      return;
    }


    this.mainService.getListById(id).subscribe( (list : StockOpeningCheckList) => {
      if (list) {
        console.log(list)
        this.instance = true;
        this.mainList = list;
      }
    
    })

  }
  onSubmit(form : NgForm) {
    console.log(form.value)
    if (!form.valid) return;
    this.mainService.createList(this.mainList).subscribe(list => {
      console.log(list);
      form.reset();
    })
   
  }
}
