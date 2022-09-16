import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { SendmessageService } from './sendmessage.service';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.scss']
})
export class SendmessageComponent implements OnInit {

  captcha: any;
  // email: boolean | string

  data = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  }

  constructor(public _sendmessageservice: SendmessageService) {
    this.captcha = '';
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    //console.log(this.captcha);
  }

  onSubmit(data: any) {
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
      this._sendmessageservice.sendEmail(data).subscribe(
        response => {
          //console.log(response)
          if (response != undefined) {
            Swal.fire({
              title: 'Message sent successfully',
              text: "If you entered your correct email, you will receive a copy.",
              icon: 'success',
              confirmButtonColor: 'green',
              confirmButtonText: 'Ok'
            })
            this.initialValues();
          } else {
            Swal.fire({
              title: 'Failed to send message',
              text: 'Please try again',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: 'red'
            })
          }
        });
    }

  }

  alertPersonalizado() {
    Swal.fire({
      title: 'Message sent successfully!',
      text: 'Do you will receive a copy in the email provided.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: 'green',
    })
  }

  initialValues() {
    this.data = {
      nome: '',
      email: '',
      telefone: '',
      mensagem: '',
    }
  }

}
