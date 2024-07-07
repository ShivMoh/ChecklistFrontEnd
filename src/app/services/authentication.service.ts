import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  loggedIn = false;
  password = "password"
  constructor() { }

  login(enteredPassword : string) {
    
    if (enteredPassword == this.password) {
      this.loggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
