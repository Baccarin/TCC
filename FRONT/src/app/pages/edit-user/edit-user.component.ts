import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditUserService } from './edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  file: any
  vacancies: any
  image:any
  base64:any
  avatar:any


  data = {
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    fone: '',
    file: '',
    avatar:'',
    foto:'',
    linkedin: '',
    vaga: '',

  }

  constructor(private _edituser: EditUserService, private sant:DomSanitizer,private router: Router) { }

  ngOnInit(): void {
    var id = sessionStorage.getItem('userId')
    this._edituser.getUserId(id).subscribe(resp => {
      this.data = resp.results[0]
      //console.log(this.data)
    })
    this.data.vaga = this.data.vaga
    this._edituser.vacancies().subscribe(resp => {
      this.vacancies = resp.results
      //console.log(this.vacancies)
    })
    //sessionStorage.removeItem('userId')

  }

  onSubmit(data: any) {
    //console.log(data)
    // data = {
    //   nome: this.data.nome,
    //   email: this.data.email,
    //   senha: this.data.senha,
    //   fone: this.data.fone,
    //   file: this.data.file,
    //   linkedin: this.data.linkedin,
    //   vaga: this.data.vaga,

    // }

    data = new FormData();

    data.append('nome', this.data.nome)
    data.append('email', this.data.email)
    // data.append('cpf', this.data.cpf)
    data.append('senha', this.data.senha)
    data.append('fone', this.data.fone)
    data.append('linkedin', this.data.linkedin)
    data.append('vaga', this.data.vaga)
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
      // data.append('file', this.data.file)
    }
    data.append('file', this.data.file)
    if (this.avatar != null) {
    
      data.append('foto', this.avatar)
    }else{
      data.append('foto', this.data.foto)
    }
  
    //new Response(data).text().then(console.log)
    this._edituser.updateUser(data).subscribe(resp => {
      console.log(resp)
      if (resp != undefined) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your update has been saved',
          showConfirmButton: false,
          timer: 2500
        })
        this.router.navigate(['/list-users'])
      }

      //  this.alertPersonalizado()
      //  this.navigate()
    })
  }

  onChange(event: any) {
    this.file = event.target.files[0]
    // this.image = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file)) as string;
    // let reader = new FileReader();
    // reader.readAsDataURL(this.file as Blob);
    // reader.onload = () => {
    //   this.base64 = reader.result as string;
    //   this.data.file = this.base64
    //   console.log(this.data.file)
    // };
    //console.log(this.file.size)
  }
  downloadPdf(base64String: any, fileName: any) {

    base64String = base64String
    //console.log(base64String)
    fileName = 'file-'+new Date();

    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf(userFile: any) {
    let base64String = userFile
    //console.log(base64String)
    this.downloadPdf(base64String,"");
  }

  onChangeAvatar(event: any) {
    this.avatar = event.target.files[0]


    //console.log(this.avatar)
  }

}
