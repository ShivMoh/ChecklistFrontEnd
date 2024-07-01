import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  files: any[] = [];
  @Output() filesEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() progressEmitter: EventEmitter<number> = new EventEmitter<number>();
  url: string = "";
  fileUrls: string[] = [];
  @Input() submitted : boolean = false;

  private acceptedFileTypes: string[] = ['application/pdf', 'application/jpg', 'application/jpeg', 'application/png', 'image/jpg']

  stateStyle: object = {
    'border': 'dashed 2px grey'
  }

  ngOnChanges() {
    if (this.submitted === true) {
      this.reset();
    }
  }

  reset() {
    this.files = [];
    this.fileUrls = [];
    this.url = "";
    this.submitted = false;
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
    if (this.files[index].progress < 100) {
   
      return;
    }
    this.files.splice(index, 1);
    this.fileUrls.splice(index, 1);

    this.filesEmitter.emit(this.files)
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {

      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          console.log(this.files[index].progress)
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            this.filesEmitter.emit(this.files)
          } else {
            this.files[index].progress += 5;
          }
          this.progressEmitter.emit(this.files[index].progress);
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
      this.files.push(item);
      this.getUrl(this.files.length - 1);
    }
    this.uploadFilesSimulator(0);
  }

  getUrl(index: number) {
    this.createLinkForFile(this.files[index]);
  }

  createLinkForFile(file: any): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.url = reader.result as string;
      this.fileUrls.push(this.url);
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
