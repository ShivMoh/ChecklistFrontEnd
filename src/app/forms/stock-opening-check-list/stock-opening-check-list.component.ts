import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StockOpeningCheckList } from '../../models/stock-opening-check-list/stock-opening-check-list';
import { StockOpeningCheckListService } from '../../services/stock-opening-check-list.service';
import { FileService } from '../../services/file.service';
import { FileType } from '../../models/file-type';

@Component({
  selector: 'app-stock-opening-check-list',
  templateUrl: './stock-opening-check-list.component.html',
  styleUrl: './stock-opening-check-list.component.scss'
})
export class StockOpeningCheckListComponent {
  instance : boolean = false;
  messageSubmittedSucessfully : boolean = false;
  submitFiles : boolean = false;
  files : File[] = []
  imageUrls : string[] = [];
  mainList: StockOpeningCheckList = {
    id: "",
    stockTask : {
      id: '',
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
  
  constructor(private mainService : StockOpeningCheckListService, 
              private activatedRoute : ActivatedRoute,
              private datePipe : DatePipe,
              private fileService :  FileService
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
      // form.reset();
      // location.reload();
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
