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
    return this.http.post<ServiceCheckList>("http://192.168.192.10/api/ServiceList/Create", serviceList);
  }

  getAllLists() : Observable<ServiceCheckList[]> {
    return this.http.post<ServiceCheckList[]>("http://192.168.192.10/api/ServiceList/GetAllLists", {});
  }

  getListById(id: string) : Observable<ServiceCheckList> {
    return this.http.get<ServiceCheckList>(`http://192.168.192.10/api/ServiceList/GetListById?id=${id}`);
  }


  createBlankList() : Observable<ServiceCheckList> {
    return this.http.get<ServiceCheckList>("http://192.168.192.10/api/ServiceList/CreateBlank");
  }

  checkIfBlankListExists() : Observable<boolean> {
    return this.http.get<boolean>("http://192.168.192.10/api/ServiceList/CheckIfBlankFormExists");
  }

  getUnsubmittedForm() : Observable<ServiceCheckList> {
    return this.http.get<ServiceCheckList>("http://192.168.192.10/api/ServiceList/GetUnsubmittedForm");
  }

  submitForm(ServiceCheckList : ServiceCheckList) : Observable<ServiceCheckList> {
    return this.http.post<ServiceCheckList>("http://192.168.192.10/api/ServiceList/SubmitForm", ServiceCheckList);
  }

  saveCurrentState(ServiceCheckList : ServiceCheckList) : Observable<ServiceCheckList> {
    return this.http.post<ServiceCheckList>("http://192.168.192.10/api/ServiceList/SaveCurrentState", ServiceCheckList);
  }
}
