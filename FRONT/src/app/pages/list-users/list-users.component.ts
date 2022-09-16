import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ListUsersService } from './list-users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: any
  value: any;
  curr: any;
  imageUrl: any;
  fotos: any
  image: any
  
  constructor(private _listusers: ListUsersService, private router: Router) { }

  ngOnInit(): void {
    this._listusers.getUsers().subscribe(resp => {
      this.users = resp.results
      //console.log(this.users)
    
    })
      
 
  }

  downloadPdf(base64String: any, fileName: any) {

    base64String = base64String
    //console.log(base64String)
    fileName = 'file-' + new Date();

    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf(userFile: any) {
    let base64String = userFile
    //console.log(base64String)
    this.downloadPdf(base64String, "sample");
  }

  onClickEditRegister(userId: any) {
    //console.log(userId)
    sessionStorage.setItem('userId', userId)
    this.router.navigate(['/edit-users'])
  }
  deleteRegister(userId: any) {
    //console.log(userId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._listusers.deleteRegister(userId).subscribe(resp => {
          console.log(resp)
          if (resp != undefined) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Deleted ok!',
              showConfirmButton: false,
              timer: 2500
            })
            this._listusers.getUsers().subscribe(resp => {
              this.users = resp.results
              //console.log(this.users)

            }
            )
            // window.location.reload()
          }

        })

      }
    })

    //window.location.reload()
  }
  navigate() {
    this.router.navigate(['/edit-users'])
  }

}
