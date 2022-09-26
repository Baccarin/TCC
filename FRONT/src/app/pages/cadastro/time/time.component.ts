

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

  tempoNotificacao = 2500;

  data = {
    nome: '',
    lider: ''
  }

  times: any;
  filter: any;

  pesquisa: any;

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
    this.limpaCampos();
  }

  
  limpaCampos(){
    this.data.nome = '';
    this.data.lider = '';
  }

  onSubmit(data: any) {

    this.timeService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
    })


  }
  navigate(): void {
    this.router.navigate(['/cadastro/time'])
  }

  edit(id: any) {

  }

  delete(data: any) {
    Swal.fire({
      title: "Ateção!",
      text: `Deseja confirmar a exclusão do registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed){
        this.timeService.delete(data).subscribe(resp => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exclusão confirmada',
            showConfirmButton: false,
            timer: this.tempoNotificacao
          })
          this.init();
        })
      }
    })
  }

  pesquisar(pesquisa:any){
    this.pesquisa = pesquisa;
    if(this.pesquisa == undefined || this.pesquisa == ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Atenção!',
        text: 'Para pesquisar, preencha o campo de pesquisa',
        showConfirmButton: true,
        confirmButtonColor:'red'
      });
      return
    }
    this.timeService.getTimesFilter(this.pesquisa).subscribe(resp => {
      this.times = resp
    })
  }

}
