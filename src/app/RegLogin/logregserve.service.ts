import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './login/loginmodel';
import { Userreg } from './register/regmodel';
@Injectable({
  providedIn: 'root'
}
)
export class LogregserveService {
  readonly rootUrl = 'https://localhost:44303/api/Login/';
  constructor(private http: HttpClient) { }

  login(logg:User){
    const body: User = {
      UserName:logg.UserName,
      Password:logg.Password
    }
    return this.http.post(this.rootUrl + 'CheckLogin', body);
  }
  reg(register:Userreg){
    const body: Userreg = {
      UserName:register.UserName,
      Password:register.Password,
      Email:register.Email,
      MobileNo:register.MobileNo
    }
    return this.http.post(this.rootUrl + 'Register', body);
  }
}

