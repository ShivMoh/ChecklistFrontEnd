import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServiceCheckList } from '../../models/service-check-list/service-check-list';
import { ServiceCheckListService } from '../../services/service-check-list.service';

@Component({
  selector: 'app-service-check-list',
  templateUrl: './service-check-list.component.html',
  styleUrl: './service-check-list.component.scss'
})
export class ServiceCheckListComponent {
  instance : boolean = false;
  mainList: ServiceCheckList = {
    id: "",
    aromaticsServer: {
      cleanGlass: false
    },
    cleanRestaurantServer: {
      sweep: false,
      wipeTables: false,
      fixFurniture: false
    },
    finalPrepServer: {
      turnOnTv: false,
      openingStandup: false,
      listUnavailableItems: false
    },
    prepSaucesServer: {
      coconutWater: false
    },
    saladPrepServer: {
      stirSaladVegeServerLights: false,
      stirSaladVegServerRemove: false
    },
    comment: {
      comment: ""
    },
    date: "",
    signature: {
      name: '',
      date: ''
    }
  };
  
  constructor(private service : ServiceCheckListService, 
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
 
    if (id == undefined || id==null) {
      return;
    }

    this.service.getListById(id).subscribe( (list : ServiceCheckList) => {
      if (list) {
        console.log(list)
        this.instance = true;
        this.mainList = list;
      }
  
    })

  }
  onSubmit(form : NgForm) {
    console.log(form.value);
    if (!form.valid) return;
    this.service.createList(this.mainList).subscribe(list => {
      console.log(list);
      form.reset();
    })
   
  }
}
