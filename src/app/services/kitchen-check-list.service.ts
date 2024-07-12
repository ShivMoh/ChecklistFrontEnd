import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KitchenCheckList } from '../models/kitchen-check-list/kitchen-check-list';

@Injectable({
  providedIn: 'root'
})
export class KitchenCheckListService {
  constructor(private http: HttpClient) { }

  createList(kitchenCheckList : KitchenCheckList) : Observable<KitchenCheckList> {
    return this.http.post<KitchenCheckList>("http://192.168.10.148:4000/api/KitchenList/Create", kitchenCheckList);
  }

  createBlankList() : Observable<KitchenCheckList> {
    return this.http.get<KitchenCheckList>("http://192.168.10.148:4000/api/KitchenList/CreateBlank");
  }

  checkIfBlankListExists() : Observable<boolean> {
    return this.http.get<boolean>("http://192.168.10.148:4000/api/KitchenList/CheckIfBlankFormExists");
  }

  getUnsubmittedForm() : Observable<KitchenCheckList> {
    return this.http.get<KitchenCheckList>("http://192.168.10.148:4000/api/KitchenList/GetUnsubmittedForm");
  }

  submitForm(kitchenCheckList : KitchenCheckList) : Observable<KitchenCheckList> {
    return this.http.post<KitchenCheckList>("http://192.168.10.148:4000/api/KitchenList/SubmitForm", kitchenCheckList);
  }

  saveCurrentState(kitchenCheckList : KitchenCheckList) : Observable<KitchenCheckList> {
    return this.http.post<KitchenCheckList>("http://192.168.10.148:4000/api/KitchenList/SaveCurrentState", kitchenCheckList);
  }

  getAllLists() : Observable<KitchenCheckList[]> {
    return this.http.post<KitchenCheckList[]>("http://192.168.10.148:4000/api/KitchenList/GetAllLists", {});
  }

  getListById(id: string) : Observable<KitchenCheckList> {
    return this.http.get<KitchenCheckList>(`http://192.168.10.148:4000/api/KitchenList/GetListById?id=${id}`);
  }
}
