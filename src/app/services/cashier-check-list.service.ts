import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashierChecklist } from '../models/cashier-check-list/cashier-checklist';

@Injectable({
  providedIn: 'root'
})
export class CashierCheckListService {

  constructor(private http: HttpClient) { }

  createList(cashierCheckList : CashierChecklist) : Observable<CashierChecklist> {
    return this.http.post<CashierChecklist>("http://192.168.10.145/api/CashierList/Create", cashierCheckList);
  }

  getAllLists() : Observable<CashierChecklist[]> {
    return this.http.post<CashierChecklist[]>("http://192.168.10.145/api/CashierList/GetAllLists", {});
  }


  getListById(id: string) : Observable<CashierChecklist> {
    return this.http.get<CashierChecklist>(`http://192.168.10.145/api/CashierList/GetListById?id=${id}`);
  }

  createBlankList() : Observable<CashierChecklist> {
    return this.http.get<CashierChecklist>("http://192.168.10.145/api/CashierList/CreateBlank");
  }

  checkIfBlankListExists() : Observable<boolean> {
    return this.http.get<boolean>("http://192.168.10.145/api/CashierList/CheckIfBlankFormExists");
  }

  getUnsubmittedForm() : Observable<CashierChecklist> {
    return this.http.get<CashierChecklist>("http://192.168.10.145/api/CashierList/GetUnsubmittedForm");
  }

  submitForm(CashierChecklist : CashierChecklist) : Observable<CashierChecklist> {
    return this.http.post<CashierChecklist>("http://192.168.10.145/api/CashierList/SubmitForm", CashierChecklist);
  }

  saveCurrentState(CashierChecklist : CashierChecklist) : Observable<CashierChecklist> {
    return this.http.post<CashierChecklist>("http://192.168.10.145/api/CashierList/SaveCurrentState", CashierChecklist);
  }
}
