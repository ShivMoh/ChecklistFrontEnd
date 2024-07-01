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
  files : File[] = []
  imageUrls : string[] = [];
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
 
    if (id == undefined || id==null) {
      return;
    }

    this.service.getListById(id).subscribe( (list : ServiceCheckList) => {
      if (list) {
        console.log("list", list)
        this.instance = true;
        this.mainList = list;
        this.getImages();

        if (this.mainList.comment.comment.length == 0) {
          this.mainList.comment.comment = "No comment"
        }
      }

      
  
    })

  }
  onSubmit(form : NgForm) {
    console.log(form.value);
    if (!form.valid) return;
    this.service.createList(this.mainList).subscribe(list => {

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
