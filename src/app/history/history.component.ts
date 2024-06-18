import { Component } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';
import { MainList } from '../models/main-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  mainLists : MainList[] = [];

  constructor(private mainService : MainServiceService, private router : Router) {

  }

  ngOnInit() {
    this.mainService.getAllLists().subscribe(lists => {
      this.mainLists = lists;
    })
  }

  navigate(id : any) {
    // console.log(id)
    this.router.navigate(["/list", id]);
  }
}
