import { Component, OnInit } from '@angular/core';
import { User } from './loginmodel';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { LogregserveService } from '../logregserve.service';
import { AuthservService } from '../Auth/authserv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userdetails: User;
  constructor(private router: Router, private auth: AuthservService, private logserve: LogregserveService) {
    localStorage.setItem('IsAuth',"false");
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
    //document.getElementById('user')?.setAttribute("value",enc);
    //alert(enc);
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',

    }
  }

  OnSubmit(form: NgForm) {
    let uname = form.value.UserName;
    let upass = form.value.Password;
    // console.log(uname,upass);

    this.userdetails = { UserName: uname, Password: upass }
    // console.log(this.userdetails)

    this.logserve.login(this.userdetails)
      .subscribe(data => {
        localStorage.setItem('UId', data as string);
        // console.log(data)
        if (data != 0) {
          this.auth.MarkValid(uname, upass)
            .subscribe(data => {

            })
          localStorage.setItem('UName', uname);
          localStorage.setItem('UPass', upass);
          
          // console.log(localStorage.getItem('UId'));

          const re = data;
          this.router.navigate(['/slots']);
          this.resetForm();
        }
        else {
          alert("Username Or Password Is Incorrect");
          this.resetForm();

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
