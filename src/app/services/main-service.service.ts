import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainList } from '../models/main-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private http: HttpClient) { }

  createList(mainList : MainList) : Observable<MainList> {
    return this.http.post<MainList>("http://localhost:5264/api/controller/Create", mainList);
  }

  getAllLists() : Observable<MainList[]> {
    return this.http.post<MainList[]>("http://localhost:5264/api/controller/GetAllLists", {});
  }


  getListById(id: string) : Observable<any> {
    return this.http.get<any>(`http://localhost:5264/api/controller/GetListById?id=${id}`);
  }
}
