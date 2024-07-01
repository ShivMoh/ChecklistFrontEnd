import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileType } from '../models/file-type';

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

  getFile(listId : string) : Observable<Blob> {
    return this.http.get<Blob>(`http://localhost:5264/api/File/GetFile?listId=${listId}`, {responseType : 'blob' as 'json'});
  }
  
  getAllFileTypeForList(listId : string) : Observable<FileType[]> {
    return this.http.get<FileType[]>(`http://localhost:5264/api/File/GetAllFileTypeForList?listId=${listId}`);
  }
}
