import { Component } from '@angular/core';
import { MainServiceService } from '../../services/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServiceCheckList } from '../../models/service-check-list/service-check-list';
import { NgForm } from '@angular/forms';
import { CashierChecklist } from '../../models/cashier-checklist';
import { CashierCheckListService } from '../../services/cashier-check-list.service';
import { FileService } from '../../services/file.service';
import { FileType } from '../../models/file-type';

@Component({
  selector: 'app-cashier-check-list',
  templateUrl: './cashier-check-list.component.html',
  styleUrl: './cashier-check-list.component.scss'
})
export class CashierCheckListComponent {
  instance : boolean = false;
  messageSubmittedSucessfully : boolean = false;
  files : File[] = []
  imageUrls : string[] = [];
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
              private datePipe: DatePipe,
              private fileService :  FileService
       
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
        this.getImages();

        if (this.mainList.comment.comment.length == 0) {
          this.mainList.comment.comment = "No comments"
      }}

    })

  }
  onSubmit(form : NgForm) {
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
