import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  password : string = "";

  constructor(  private authService : AuthenticationService,
                private router : Router
  ) {

  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/history']);
    }
  }


  login() {
    console.log("password", this.password);
    if (this.authService.login(this.password)) {
      this.router.navigate(['/history']);
    }
  }
}
