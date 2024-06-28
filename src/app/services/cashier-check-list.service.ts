import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashierChecklist } from '../models/cashier-checklist';

@Injectable({
  providedIn: 'root'
})
export class CashierCheckListService {

  constructor(private http: HttpClient) { }

  createList(cashierCheckList : CashierChecklist) : Observable<CashierChecklist> {
    return this.http.post<CashierChecklist>("http://localhost:5264/api/CashierList/Create", cashierCheckList);
  }

  getAllLists() : Observable<CashierChecklist[]> {
    return this.http.post<CashierChecklist[]>("http://localhost:5264/api/CashierList/GetAllLists", {});
  }


  getListById(id: string) : Observable<CashierChecklist> {
    return this.http.get<CashierChecklist>(`http://localhost:5264/api/CashierList/GetListById?id=${id}`);
  }
}
