import { Component, Input } from '@angular/core';
import { MainList } from '../models/main-list';
import { MainServiceService } from '../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Visitor } from '@angular/compiler';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss'
})
export class MainTableComponent {

  instance : boolean = false;
  mainList: MainList = {
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
    cashierChecklist:  {
      checkCash: false,
      ensurePrinter: false,
      ensureChange: false,
      tidyWorkstation: false
    },
    stockOpeningCheckList: {
      checkUtensils: false,
      towels: false,
      coldCups: false,
      straws: false,
      tissuesPacks: false,
      beverages: false,
      condiments: false,
      ramenBar: false,
      tissues: false,
      teaBags: false,
      takeoutBox: false
    },
    signature: {
      kitchenName: '',
      serviceName: '',
      kitchenDate: '',
      serviceDate: ''
    },
    comment: {
      comment: ""
    },   
    date: new Date()
  };
  
  constructor(private mainService : MainServiceService, 
              private activatedRoute : ActivatedRoute,
              private datePipe : DatePipe
            ) {
    
  }

  ngOnInit() {
    this.getList();
    
    // console.log(this.mainList.signature.kitchenDate)
    
  }

  getList() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id == undefined || id==null) {
      return;
    }


    this.mainService.getListById(id).subscribe( (list : MainList) => {
      if (list) {
        console.log(list)
        this.instance = true;
        this.mainList = list;
      }
      // console.log("List", list)
      // console.log(list.aromaticsServer)
      // this.mainList.aromaticsServer.cleanGlass = list.aromaticsServer.cleanGlass;

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
