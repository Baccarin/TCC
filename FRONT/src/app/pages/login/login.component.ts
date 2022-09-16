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

  constructor(public _loginservice: LoginService, private router: Router) {
    this.captcha = '';
   }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  onSubmit(data:any){
    if (this.captcha == '') {
      Swal.fire({
        title: 'Click on the captcha',
        text: 'Please try again',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    } else {
      var token = this._loginservice.login(data).subscribe(
        resp => {
          console.log(resp);
        });
      
    }
 
  }

  voltar(){
    this.router.navigate(['/']);
  }

 

}
