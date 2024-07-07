import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  @Input() submitFiles : boolean = false;
  @Input() label : string = "";
  @Input() fileContainerTypeId : string = "";
  @Input() listReferenceTypeId : string = ""; 
  @Input() instance : boolean = false;
  imageUrl : string = "";

  file: any = null;
  // @Output() filesEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() progressEmitter: EventEmitter<number> = new EventEmitter<number>();
  url: string = "";
  fileUrls: string[] = [];
  @Input() submitted : boolean = false;
  
  private acceptedFileTypes: string[] = ['application/pdf', 'application/jpg', 'application/jpeg', 'application/png', 'image/jpg']

  constructor(private fileService : FileService) {

  }

  stateStyle: object = {
    'border': 'dashed 2px grey'
  }

  ngOnInit() {
   
  }


  ngOnDestroy() {
    if (this.file != null) {
      this.fileService.uploadFile(
        this.file, 
        this.listReferenceTypeId, 
        this.fileContainerTypeId, 
        this.label
    ).subscribe(files => {
        console.log(files);
      })
      this.reset();
  
    }
  
  }

  ngOnChanges() {
    if (this.instance) {

      this.stateStyle = {
        'border' : 'none'
      }
     
    } else {
   
      this.stateStyle = {
        'border' : 'dashed 2px grey'
      }
    }

    if (true) {
    
      if(this.fileContainerTypeId.length > 0) {
       
        this.fileService.getAllFileTypeForAttribute(this.fileContainerTypeId).subscribe(files => {
      
          if(files.length > 0) {
            var index = files.findIndex(file => {
              return file.label == this.label
            })
  
            
            if (index != -1) {
          
              this.fileService.getFile(files[index].path).subscribe(blob => {
                const reader = new FileReader();

                reader.readAsDataURL(blob); 
                reader.onloadend = () => {
                    this.imageUrl = reader.result as string;
           
                };
              })
            }
            }
        })
      }
    }
    
    if (this.submitFiles === true) {
      
      if (this.file != null) {
        this.fileService.uploadFile(this.file, this.listReferenceTypeId, this.fileContainerTypeId, this.label).subscribe(files => {
          console.log(files);
        })
        this.reset();
      }
      
    }

  
  }

  reset() {
    this.file = null;
    this.fileUrls = [];
    this.url = "";
    this.submitted = false;
    location.reload();
  }

  updateStateStyle(event: object) {
    this.stateStyle = event;
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  
  }

  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.files);
  
  }


  deleteFile(index: number) {
    if (this.file.progress < 100) {
      return;
    }
    this.file = null;

  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {

      if (index === 1) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          console.log(this.file.progress)
          if (this.file.progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            // this.filesEmitter.emit(this.files)
          } else {
            this.file.progress += 5;
          }
          this.progressEmitter.emit(this.file.progress);
        }, 200);
      }
    }, 1000);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      console.log(item['type'])
      // if(!this.acceptedFileTypes.includes(item['type'])) {
      //   // maybe replace with something nicer
      //   alert("File Type Not Allowed!");
      //   return;
      // }

      item.progress = 0;
      this.file = item
      this.fileService.uploadFile(this.file, this.listReferenceTypeId, this.fileContainerTypeId, this.label).subscribe(returnedFile => {
        console.log("Updating on file drop", returnedFile);
        const reader = new FileReader();

        reader.readAsDataURL(this.file); 
        reader.onloadend = () => {
            this.imageUrl = reader.result as string;
            
        };
      })
    }
    this.uploadFilesSimulator(0);
  }

  getUrl(index: number) {
    this.createLinkForFile(this.file);
  }

  createLinkForFile(file: any): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageUrl = reader.result as string;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
