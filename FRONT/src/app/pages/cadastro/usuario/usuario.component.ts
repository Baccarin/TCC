

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    idPessoa: '',
    login: '',
    senha: ''
  }

  pessoas: any;
  filter: any;
  usuarios: any;

  pesquisa: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.usuarioService.getAll().subscribe(response =>{
      this.usuarios = response;
    })

    this.getAllPessoas();
    this.limpaCampos();
  }

  
  limpaCampos(){
    this.data.idPessoa = '';
    this.data.senha = '';
    this.data.login = '';
  }

  onSubmit(data: any) {
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

  getAllPessoas(){
    this.usuarioService.getAllPessoas().subscribe(resp => {
      this.data.idPessoa = resp[0].id;
      this.pessoas = resp;
    })
  }

}
