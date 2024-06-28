import { Component } from '@angular/core';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServiceCheckList } from '../../models/service-check-list/service-check-list';
import { NgForm } from '@angular/forms';
import { CashierChecklist } from '../../models/cashier-checklist';
import { CashierCheckListService } from '../../services/cashier-check-list.service';

@Component({
  selector: 'app-cashier-check-list',
  templateUrl: './cashier-check-list.component.html',
  styleUrl: './cashier-check-list.component.scss'
})
export class CashierCheckListComponent {
  instance : boolean = false;
  mainList: CashierChecklist = {
    id: "",
    checkCash: false,
    ensurePrinter: false,
    ensureChange: false,
    tidyWorkstation: false,
    comment: {
      comment: ''
    },
    signature: {
      name: '',
      date: ''
    },
    date: ""
  };
  
  constructor(private mainService : CashierCheckListService, 
              private activatedRoute : ActivatedRoute,
              private datePipe: DatePipe
       
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


    this.mainService.getListById(id).subscribe( (list : CashierChecklist) => {
      if (list) {
        console.log(list)
        this.instance = true;
        this.mainList = list;
      }

    })

  }
  onSubmit(form : NgForm) {
    if (!form.valid) return;
    this.mainService.createList(this.mainList).subscribe(list => {
      console.log(list);
      form.reset();
    })
   
  }
}
