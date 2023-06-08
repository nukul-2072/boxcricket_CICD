import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogregserveService } from '../logregserve.service';

@Injectable({
  providedIn: 'root'
})
export class AuthservService {

  isAuthenticated: boolean = false;
  UserName:string = "";
  Pass:string = "";
  constructor() { }

  getIsAuth(): Observable<boolean> {
    return of(this.isAuthenticated);
  }
  MarkValid(Uname: string , password: string):Observable<boolean> {
    this.UserName = Uname;
    this.Pass = password;
    this.isAuthenticated = true;
    localStorage.setItem('IsAuth',"true")
    // alert(this.isAuthenticated)
    return of(true);
  }
  LoggedIN():Observable<boolean> {
    console.log("LoggedIN Called")
    this.isAuthenticated = true;
    return of(true);
  }
}
