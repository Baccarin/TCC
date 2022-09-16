import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  captcha:string;

  data={
    login:'',
    senha:'',
  }

  ret:any

  constructor(public _loginservice: LoginService,private router: Router) {
    this.captcha = '';
   }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }


    onSubmit(data:any){
   // console.log(data)
   if (this.captcha == '') {
    Swal.fire({
      title: 'Click on the captcha',
      text: 'Please try again',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: 'red',
    })
  }
  else {
    this._loginservice.login(data).subscribe(
      (resp)=>{
        this.ret=resp
        console.log(resp);
        if(this.ret.token){
          sessionStorage.setItem('token',this.ret.token)
          this._loginservice.ip().subscribe(
            (response)=>{
              var data = response;
              this._loginservice.sIp(data).subscribe(
                (resp)=>{
                });

            });
          this.router.navigate(['/'])
        }

      }
    )
  }
 
  }

  voltar(){
    this.router.navigate(['/']);
  }

 

}
