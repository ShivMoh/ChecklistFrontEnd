import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockOpeningCheckList } from '../models/stock-opening-check-list';

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
}
