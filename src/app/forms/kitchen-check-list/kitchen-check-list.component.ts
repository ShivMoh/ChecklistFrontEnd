import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KitchenCheckList } from '../../models/kitchen-check-list/kitchen-check-list';
import { KitchenCheckListService } from '../../services/kitchen-check-list.service';

@Component({
  selector: 'app-kitchen-check-list',
  templateUrl: './kitchen-check-list.component.html',
  styleUrl: './kitchen-check-list.component.scss'
})
export class KitchenCheckListComponent {
  instance : boolean = false;
  messageSubmittedSucessfully : boolean = false;
  mainList: KitchenCheckList = {
    id : "",
    aromatics: {
      prepAromatics: false,
      readyDesserts: false
    },
    arrivalBasics: {
      powerOnLights: false,
      powerOnKitchenAcOnly: false
    },
    brothPrep: {
      washMeats: false,
      fillPots: false,
      prepVegetables: false,
      monitorPots: false,
      boilBroths: false
    },
    finalPrep: {
      informServiceTeam: false,
      readyStation: false
    },
    prepProteins: {
      prepFish: false,
      prepMeatOrange: false,
      prepSkewers: false,
      prepTofu: false,
      prepWings: false,
      prepareChickenChashu: false,
      prepareChickenKatsu: false,
      prepareShrimpNobu: false,
      prepareShrimpTempura: false,
      prepareSousVideBeef: false,
      seasonSalmon: false
    },
    prepSauces: {
      senseiSauce: false,
      finishingSauce: false
    },
    saladPrep: {
      prepSaladVeg: false
    },
    stirFryVeg: {
      stirFryVeg: false
    },
    toppingsPrep: {
      blanchChoy: false,
      friedRicePrep: false
    },
    signature: {
      name: '',
      date: '',
    },
    comment: {
      comment: ""
    },   
    date: ""
  };
  
  constructor(private mainService : KitchenCheckListService, 
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


    this.mainService.getListById(id).subscribe( (list : KitchenCheckList) => {
      if (list) {
        console.log(list)
        this.instance = true;
        this.mainList = list;
      }
   
    })
  }

  onSubmit(form : NgForm) {
    console.log(this.mainList)
    if (!form.valid) return;
    this.mainService.createList(this.mainList).subscribe(list => {
      console.log(list);
      form.reset();
    })
   
  }

  getFiles(event: any) {
    
  }

  getFileProgress(event : any) {

  }
}
