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
  submitFiles : boolean = false;
  files : File[] = []
  imageUrls : string[] = [];
  mainList: KitchenCheckList = {
    id : "",
    aromatics: {
      prepAromatics: false,
      readyDeserts: false,
      fileContainerTypeId: ''
    },
    arrivalBasics: {
      powerOnLights: false,
      powerOnKitchenAcOnly: false,
      fileContainerTypeId: ''
    },
    brothPrep: {
      washMeats: false,
      fillPots: false,
      prepVegetables: false,
      monitorPots: false,
      boilBroths: false,
      fileContainerTypeId: ''
    },
    finalPrep: {
      informServiceTeam: false,
      readyStation: false,
      fileContainerTypeId: ''
    },
    prepProteins: {
      prepFish: false,
      prepMeatOrange: false,
      prepSkewers: false,
      prepTofu: false,
      prepWings: false,
      prepareChickenChashu: false,
      prepareChickenKatsu: false,
      prepareShrimpNobo: false,
      prepareShrimpTempura: false,
      prepareSousVideBeef: false,
      seasonSalmon: false,
      fileContainerTypeId: ''
    },
    prepSauces: {
      senseiSauce: false,
      finishingSauce: false,
      fileContainerTypeId: ''
    },
    saladPrep: {
      prepSaladVeg: false,
      fileContainerTypeId: ''
    },
    stirFryVeg: {
      stirFryVeg: false,
      fileContainerTypeId: ''
    },
    toppingsPrep: {
      blanchChoy: false,
      friedRicePrep: false,
      fileContainerTypeId: ''
    },
    signature: {
      name: '',
   
    },
    comment: {
      comment: ""
    },
    endDate: "",
    startDate: ""
  };
  
  constructor(private mainService : KitchenCheckListService, 
              private activatedRoute : ActivatedRoute,
              private datePipe : DatePipe,
              private fileService : FileService
            ) {
    
  }

  ngOnInit() {
    this.getList();
    // this.mainList.date = this.datePipe.transform(new Date().toString(), "yyyy-MM-dd:hh-mm-ss")!;
  }

  ngOnDestroy() {
    this.mainService.checkIfBlankListExists().subscribe(exist => {
      if(exist) {
        console.log("saving state");
        this.mainService.saveCurrentState(this.mainList).subscribe(list => {
          console.log("Saved state", list);
        })
      }
    })
  }
  

  getList() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
   
    if (id == undefined || id==null) {
      console.log("helllo....")
      // check if an incomplete form exists

      this.mainService.checkIfBlankListExists().subscribe(exist => {
        if(exist) {
          // if so, load the save data
          this.mainService.getUnsubmittedForm().subscribe(list => {
            this.mainList = list;
          });
        } else {
          this.mainService.createBlankList().subscribe(list => {
          
            this.mainList = list;
          });
        }
      })
      // if not, create a blank form
      return;
    } else {
      this.mainService.getListById(id).subscribe( (list : KitchenCheckList) => {
        if (list) {
          this.instance = true;
          this.mainList = list;
          console.log(this.mainList);
          this.getImages();
  
          if (this.mainList.comment.comment.length == 0) {
            this.mainList.comment.comment = "No comments"
          }}
     
      })
    }

    
  }

  onSubmit(form : NgForm) {
    console.log(this.mainList)
 
    if (!form.valid) return;
    this.mainService.submitForm(this.mainList).subscribe(list => {
      this.submitFiles = true;
      // this.fileService.uploadFile(this.files, list.listReferenceTypeId!).subscribe(files => {
      //   console.log("files...", files)
      // })
      // form.reset();
      // location.reload();
    })
   
  }

  insertFile(file: any) {
    this.files = file;
  }

  getImages() {
  

      this.fileService.getAllFileTypeForList(this.mainList.listReferenceTypeId!).subscribe( (returnFiles : FileType[]) => {
     
        for (let index = 0; index < returnFiles.length; index++) {
          this.fileService.getFile(returnFiles[index].path).subscribe(blob => {
  
            const reader = new FileReader();
                reader.readAsDataURL(blob); 
                reader.onloadend = () => {
                    this.imageUrls.push(reader.result as string);
                };
          })
        }
        
      })

  }

  getFileProgress(event : any) {

  }



}
