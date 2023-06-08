import { Component, OnInit } from '@angular/core';
import { Userreg } from './regmodel';
import { NgForm, NgModel } from '@angular/forms';


import { CanActivate, Router, RouterLinkWithHref, RouterLink } from '@angular/router';
import { sha256 } from 'js-sha256';
import { LogregserveService } from '../logregserve.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Userreg;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  regUserDetails:Userreg;
  constructor(private router: Router,private regg:LogregserveService) {

  }
  public isAuth: boolean = false;
  ngOnInit() {
    this.resetForm();
  }
  encrypted = '';
  onChange(value: any) {

    const enc = sha256.update(value.target.value).hex();
    this.encrypted = enc;
    this.user.Password = enc;
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      MobileNo: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.regUserDetails = {UserName:form.value.UserName, Password:form.value.Password, Email:form.value.Email, MobileNo:form.value.MobileNo};
    console.log(this.regUserDetails);
    this.regg.reg(this.regUserDetails)
    .subscribe(data => {
      // console.log(data)
      if (data == true) {
        this.router.navigate(['/login']);
      }
    },
      (error: any) => {
        alert(error.error.message)
        console.log(error.error.message);

        this.resetForm();
      })

    // this.userService.registerUser(form.value.UserName,form.value.Password)
    //   .subscribe((data: any) => {
    //     this.authServ.MarkValid(form.value.UserName,form.value.Password)
    //     .subscribe((data:any)=>{

    //     })
    //     localStorage.setItem('UName',form.value.UserName);
    //     localStorage.setItem('UPass',form.value.Password);
    //     const re = data;
    //     this.router.navigate(['/dashboard']);
    //     this.resetForm();
    //     console.log(re.message);
    //   },
    //     (error: any) => {
    //       alert(error.error.message)
    //       console.log(error.error.message);

    //       this.resetForm();
    //     }
    //   );


  }
}
