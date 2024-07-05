import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockOpeningCheckList } from '../models/stock-opening-check-list/stock-opening-check-list';

@Injectable({
  providedIn: 'root'
})
export class StockOpeningCheckListService {
  constructor(private http: HttpClient) { }

  createList(stockOpeningList : StockOpeningCheckList) : Observable<StockOpeningCheckList> {
    return this.http.post<StockOpeningCheckList>("http://localhost:5264/api/StockList/Create", stockOpeningList);
  }

  getAllLists() : Observable<StockOpeningCheckList[]> {
    return this.http.post<StockOpeningCheckList[]>("http://localhost:5264/api/StockList/GetAllLists", {});
  }

  getListById(id: string) : Observable<StockOpeningCheckList> {
    return this.http.get<StockOpeningCheckList>(`http://localhost:5264/api/StockList/GetListById?id=${id}`);
  }

  createBlankList() : Observable<StockOpeningCheckList> {
    return this.http.get<StockOpeningCheckList>("http://localhost:5264/api/StockList/CreateBlank");
  }

  checkIfBlankListExists() : Observable<boolean> {
    return this.http.get<boolean>("http://localhost:5264/api/StockList/CheckIfBlankFormExists");
  }

  getUnsubmittedForm() : Observable<StockOpeningCheckList> {
    return this.http.get<StockOpeningCheckList>("http://localhost:5264/api/StockList/GetUnsubmittedForm");
  }

  submitForm(StockOpeningCheckList : StockOpeningCheckList) : Observable<StockOpeningCheckList> {
    return this.http.post<StockOpeningCheckList>("http://localhost:5264/api/StockList/SubmitForm", StockOpeningCheckList);
  }

  saveCurrentState(StockOpeningCheckList : StockOpeningCheckList) : Observable<StockOpeningCheckList> {
    return this.http.post<StockOpeningCheckList>("http://localhost:5264/api/StockList/SaveCurrentState", StockOpeningCheckList);
  }

}
