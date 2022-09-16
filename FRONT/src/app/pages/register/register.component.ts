import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  file: any
  avatar: any
  vacancies: any

  data = {
    name: '',
    email: '',
    cpf: '',
    password: '',
    phone: '',
    file: '',
    avatar: '',
    linkedin: '',
    vacancy: '',

  }

  constructor(private _registerservice: RegisterService, private router: Router) { }

  ngOnInit() {
    this._registerservice.vacancies().subscribe(resp => {
      this.vacancies = resp.results
      // console.log(this.vacancies)
    })

  }

  onChange(event: any) {
    this.file = event.target.files[0]
    if (this.file.type != 'application/pdf') {
      // alert('The allowed file type is PDF')
      Swal.fire({
        title: 'The allowed file type is PDF!',
        text: 'Try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    }

    //console.log(this.file)
  }

  onChangeAvatar(event: any) {
    this.avatar = event.target.files[0]


    //console.log(this.avatar)
  }
  onSubmit(data: any) {
    //console.log(data)

    data = new FormData();

    data.append('nome', this.data.name)
    data.append('email', this.data.email)
    // data.append('cpf', this.data.cpf)
    data.append('senha', this.data.password)
    data.append('fone', this.data.phone)
    data.append('linkedin', this.data.linkedin)
    data.append('vaga', this.data.vacancy)
    if (this.file != undefined) {
      if (this.file.type != 'application/pdf') {
        // alert('The allowed file type is PDF')
        Swal.fire({
          title: 'The allowed file type is PDF!',
          text: 'Try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'red',
        })
        return
      }
      if (this.file.size > 689732) {
        Swal.fire({
          title: 'The maximum allowed file size is 673 KB!',
          text: 'Try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'red',
        })
        //alert('The maximum allowed file size is 673 KB')
        return
      }
      data.append('file', this.file)
    }
    if (this.avatar != undefined) {
    
      data.append('avatar', this.avatar)
    }

    //new Response(data).text().then(console.log)

    this._registerservice.register(data).subscribe(resp => {
      // console.log(resp)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your register has been saved',
        showConfirmButton: false,
        timer: 2500
      })
      this.navigate()
    })


  }
  navigate(): void {
    this.router.navigate(['/list-users'])
  }
  alertPersonalizado() {
    Swal.fire({
      title: 'Registration successfully completed!',
      text: 'Click ok and view your record.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: 'green',
    })
  }



}
