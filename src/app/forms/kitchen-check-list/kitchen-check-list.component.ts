import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KitchenCheckList } from '../../models/kitchen-check-list/kitchen-check-list';
import { KitchenCheckListService } from '../../services/kitchen-check-list.service';
import { FileType } from '../../models/file-type';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-kitchen-check-list',
  templateUrl: './kitchen-check-list.component.html',
  styleUrl: './kitchen-check-list.component.scss'
})
export class KitchenCheckListComponent {
  instance : boolean = false;
  messageSubmittedSucessfully : boolean = false;
  files : File[] = []
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
              private datePipe : DatePipe,
              private fileService : FileService
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
    console.log(this.files)
    if (!form.valid) return;
    this.mainService.createList(this.mainList).subscribe(list => {
      console.log(list.id)
      this.fileService.uploadFile(this.files, list.id).subscribe(files => {
        console.log(files)
      })
      form.reset();
      location.reload();
    })
   
  }

  getFiles(files: any) {
    this.files = files
  }

  filee : FileType[] = [];
  something() {
    // console.log(this.files)
    // const promises = this.files.map(file => {
    //   return this.fileToBytes(file).then(bytes => {
    //     this.filee.push({
    //       name : file.name,
    //       type : file.type,
    //       bytes :  bytes as Uint8Array
    //     })
    //     console.log("helloo");
    //     console.log(this.filee)
    //   })
    // })
    
    // Promise.all(promises).then(() => {
    
      this.fileService.uploadFile(this.files, "xxxx-xxxx-xxxx-xxxx").subscribe(files => {
        console.log("Returned files", files);
      })
    // })
    

  }

  getFileProgress(event : any) {

  }

  fileToBytes(file : any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event : any) {
            // const arrayBuffer = event.target.result;
            // const bytes = new Uint8Array(arrayBuffer);
            resolve(event.target.result);
        };
        reader.onerror = function(event) {
            reject(new Error("Error reading file"));
        };
        reader.readAsDataURL(file);
    });
}
}
