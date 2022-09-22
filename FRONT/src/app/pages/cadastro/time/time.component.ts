

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TimeService } from './time.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})

export class TimeComponent implements OnInit {

  data : {
    nome: '',
    lider: ''
  }

  constructor(
    private _registerservice: TimeService,
    private router: Router) { }

  ngOnInit(): void {
  
  }

  init() {

  }


  onSubmit(data: any) {

    this._registerservice.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Projeto salvo com sucesso',
        showConfirmButton: false,
        timer: 2500
      })
      this.navigate()
    })


  }
  navigate(): void {
    this.router.navigate(['/cadastro/time'])
  }



}
