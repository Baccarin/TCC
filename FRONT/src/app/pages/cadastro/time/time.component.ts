

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

  data = {
    nome: '',
    lider: ''
  }

  times: any;
  filter: any;

  constructor(
    private timeService: TimeService,
    private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.timeService.getAll().subscribe(response =>{
      this.times = response;
    })
  }


  onSubmit(data: any) {

    this.timeService.register(data).subscribe(resp => {
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

  edit(id: any) {

  }

  delete(id: any) {
    Swal.fire({
      title: "Warning!",
      text: `Do you really want to delete ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Yes, is it!'
    }).then((result) => {

    })
  }


}
