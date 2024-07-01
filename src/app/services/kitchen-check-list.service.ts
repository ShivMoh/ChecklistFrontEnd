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
    return this.http.post<KitchenCheckList>("http://localhost:5264/api/KitchenList/Create", kitchenCheckList);
  }



  getAllLists() : Observable<KitchenCheckList[]> {
    return this.http.post<KitchenCheckList[]>("http://localhost:5264/api/KitchenList/GetAllLists", {});
  }

 


  getListById(id: string) : Observable<KitchenCheckList> {
    return this.http.get<KitchenCheckList>(`http://localhost:5264/api/KitchenList/GetListById?id=${id}`);
  }
}
