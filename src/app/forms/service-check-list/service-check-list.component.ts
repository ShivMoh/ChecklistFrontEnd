import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServiceCheckList } from '../../models/service-check-list/service-check-list';
import { ServiceCheckListService } from '../../services/service-check-list.service';
import { FileService } from '../../services/file.service';
import { FileType } from '../../models/file-type';

@Component({
  selector: 'app-service-check-list',
  templateUrl: './service-check-list.component.html',
  styleUrl: './service-check-list.component.scss'
})
export class ServiceCheckListComponent {
  instance : boolean = false;
  messageSubmittedSucessfully : boolean = false;
  submitFiles : boolean = false;
  files : File[] = []
  imageUrls : string[] = [];
  mainList: ServiceCheckList = {
    id: "",
    aromaticsServer: {
      cleanGlass: false,
      fileContainerTypeId: ''
    },
    cleanRestaurantServer: {
      sweep: false,
      wipeTables: false,
      fixFurniture: false,
      fileContainerTypeId: ''
    },
    finalPrepServer: {
      turnOnTv: false,
      openingStandup: false,
      listUnavailableItems: false,
      fileContainerTypeId: ''
    },
    prepSaucesServer: {
      coconutWater: false,
      fileContainerTypeId: ''
    },
    saladPrepServer: {
      stirSaladVegeServerLights: false,
      stirSaladVegeServerRemove : false,
      fileContainerTypeId: ''
    },
    comment: {
      comment: ""
    },
    date: "",
    signature: {
      name: '',
 
    }
  };
  
  constructor(private mainService : ServiceCheckListService, 
              private activatedRoute : ActivatedRoute,
              private datePipe : DatePipe,
              private fileService : FileService
            ) {
    
  }

  ngOnInit() {
    this.getList();
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
            console.log(this.mainList);
            // this.getImages();
          });
        } else {
          this.mainService.createBlankList().subscribe(list => {
            console.log(list);
            this.mainList = list;
          });
        }
      })
      // if not, create a blank form
      return;
    } else {
      this.mainService.getListById(id).subscribe( (list) => {
        if (list) {
          this.instance = true;
          this.mainList = list;
          console.log(this.mainList);
          // this.getImages();
  
          if (this.mainList.comment.comment.length == 0) {
            this.mainList.comment.comment = "No comments"
          }}
     
      })
    }

    
  }
  onSubmit(form : NgForm) {
    console.log("main list", this.mainList)
 
    if (!form.valid) return;
    this.mainService.submitForm(this.mainList).subscribe(list => {
      this.submitFiles = true;
      // this.fileService.uploadFile(this.files, list.listReferenceTypeId!).subscribe(files => {
      //   console.log("files...", files)
      // })
      form.reset();
      location.reload();
    })
   
  }

  getFiles(files: any) {
    this.files = files
  }

  getImages() {
      this.fileService.getAllFileTypeForList(this.mainList.id).subscribe( (returnFiles : FileType[]) => {
     
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
