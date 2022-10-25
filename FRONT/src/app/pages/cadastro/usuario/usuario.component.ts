

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-notes',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

  tempoNotificacao = 2500;

  data:any = {
    id: '',
    idFuncionario: '',
    login: '',
    senha: ''
  }

  funcionarios: any;
  filter: any;
  usuarios: any;

  pesquisa: any;

  formModal: any;


  constructor(
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalUsuario'),
    );
    this.init();
  }

  init() {
    this.usuarioService.getAll().subscribe(response =>{
      this.usuarios = response;
    })

    this.getAllFuncionarios();
    this.limpaCampos();
  }

  atualizarUsuario(data:any){
    this.usuarioService.atualizarUsuario(data).subscribe(resp => {
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
  
  limpaCampos(){
    this.data.idPessoa = '';
    this.data.senha = '';
    this.data.login = '';
  }

  onSubmit(data: any) {

    if (data.idFuncionario == '' || data.idFuncionario == null || data.idFuncionario == "undefined" || 
    data.login == '' || data.login == null || data.login == "undefined" ||
    data.senha == '' || data.senha == null || data.senha == "undefined"){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Atenção!',
        text: 'É necessário informar todos os campos para cadastrar. ',
        showConfirmButton: true,
        confirmButtonColor:'red'
      });
      return;
    }

    this.usuarioService.register(data).subscribe(resp => {
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

  openModal(id:any) {
    this.usuarioService.getUsuarioById(id).subscribe(resp => {
      this.data = resp;
      this.data.idUsuario = id;
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
        this.usuarioService.delete(data).subscribe(resp => {
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
    this.usuarioService.getUsuariosFilter(this.pesquisa).subscribe(resp => {
      this.usuarios = resp
    })
  }

  getAllFuncionarios(){
    this.usuarioService.getAllFuncionarios().subscribe(resp => {
      this.data.idFuncionario = resp[0].id;
      this.funcionarios = resp;
    })
  }

  observaFuncionario(event: any){
    this.data.idFuncionario = event.target.value;
  }

}
