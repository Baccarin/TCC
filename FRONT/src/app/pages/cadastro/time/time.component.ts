import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TimeService } from './time.service';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-notes',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})

export class TimeComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    id: '',
    nome: '',
    idLider: ''
  }

  times: any;
  filter: any;
  liders: any;

  pesquisa: any;
  formModal: any;

  constructor(
    private timeService: TimeService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalTime'),
      );

    this.timeService.getAll().subscribe(response =>{
      this.times = response;
    })

    this.getAllLiders();
    this.limpaCampos();
  }

  
  limpaCampos(){
    this.data.nome = '';
    this.data.idLider = '';
    this.data.id = '';
  }

  onSubmit(data: any) {
    this.timeService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Operação realizada com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
    })


  }

  openModal(id: any) {
    this.timeService.getTime(id).subscribe(resp => {
      this.data = resp
    })
    this.formModal.show();
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

  getAllLiders(){
    this.timeService.getAllLiders().subscribe(resp => {
      this.data.idLider = resp[0].id;
      this.liders = resp;
    })
  }

  updateTime(data:any){

    var postData = {
      idTime: data.id,
      idLider: this.data.idLider,
      nome: data.nome
    };

    this.timeService.atualizarTime(postData).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro atualizado com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.formModal.hide();
      this.init();
      this.limpaCampos();
    })
  }

  observaLider(event: any){
    console.log(event.target.value)
    this.data.idLider = event.target.value;
  }

}
