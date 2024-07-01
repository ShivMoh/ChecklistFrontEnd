import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  forms : any[][] = [
    ["Kitchen checklist form", "kitchen-check-list"],
    ["Service checklist form", "service-check-list"],
    ["Cashier checklist form", "cashier-check-list"],
    ["Stock opening check list", "stock-opening-check-list"],
  ]

  constructor(private router : Router) {

  }

  navigate(route : any) {
    // console.log(id)
    this.router.navigate([`/${route}`]);
  }
}
