import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http : HttpClient) { }

  uploadFile(files : any[], listId : string) : Observable<any[]> {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    formData.append("listId", listId);
    return this.http.post<any[]>("http://localhost:5264/api/File/UploadFile", formData);
  }

}
