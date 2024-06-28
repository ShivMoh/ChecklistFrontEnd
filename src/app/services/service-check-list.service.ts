import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceCheckList } from '../models/service-check-list/service-check-list';

@Injectable({
  providedIn: 'root'
})
export class ServiceCheckListService {
  constructor(private http: HttpClient) { }

  createList(serviceList : ServiceCheckList) : Observable<ServiceCheckList> {
    return this.http.post<ServiceCheckList>("http://localhost:5264/api/ServiceList/Create", serviceList);
  }

  getAllLists() : Observable<ServiceCheckList[]> {
    return this.http.post<ServiceCheckList[]>("http://localhost:5264/api/ServiceList/GetAllLists", {});
  }

  getListById(id: string) : Observable<ServiceCheckList> {
    return this.http.get<ServiceCheckList>(`http://localhost:5264/api/ServiceList/GetListById?id=${id}`);
  }
}
