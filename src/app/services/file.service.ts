import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileType } from '../models/file-type';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http : HttpClient) { }

  uploadFile(file : any, listId : string, fileContainerTypeId : string, label? : string) : Observable<any[]> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append("listReferenceId", listId);
    formData.append("fileContainerTypeId", fileContainerTypeId);
    formData.append("label", label!);

    // console.log(listId);
    return this.http.post<any[]>("http://192.168.10.148:4000/api/File/UploadFile", formData);
  }

  getFile(listId : string) : Observable<Blob> {
    return this.http.get<Blob>(`http://192.168.10.148:4000/api/File/GetFile?filePath=${listId}`, {responseType : 'blob' as 'json'});
  }
  
  getAllFileTypeForList(listId : string) : Observable<FileType[]> {
    return this.http.get<FileType[]>(`http://192.168.10.148:4000/api/File/GetAllFileTypeForList?listReferenceTypeId=${listId}`);
  }

  getAllFileTypeForAttribute(fileContainerTypeId : string) : Observable<FileType[]> {
    return this.http.get<FileType[]>(`http://192.168.10.148:4000/api/File/GetAllFileTypeForAttribute?fileContainerTypeId=${fileContainerTypeId}`);
  }

}
