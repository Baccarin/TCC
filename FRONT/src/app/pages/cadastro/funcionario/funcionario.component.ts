import { Component, OnInit  } from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})

export class FuncionarioComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    idUsuario: '',
    idEmpresa: ''
  }

  funcionarios: any;
  empresas:any;
  filter: any;

  usuarios: any;

  pesquisa: any;

  formModal: any;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router) { }


  init(){
    this.funcionarioService.getAll().subscribe(response =>{
      this.funcionarios = response;
    })

    this.getAllEmpresas();
    this.getAllUsuarios();

  }

  ngOnInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalFuncionario'),
    );
    this.init();
  }


  onSubmit(data: any) {
    this.funcionarioService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Funcionário salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init()
    })
  }

  limpaCampos(){
    this.data.idUsuario = '';
    this.data.idEmpresa = '';
  }


  updateFuncionario(data: any) {

  }

  edit(data: any){
    
  }

  openModal(id:any) {
    this.funcionarioService.getFuncionario(id).subscribe(resp => {
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
        this.funcionarioService.delete(data).subscribe(resp => {
          this.init();
        })
      }
    })
  }


  teste(){
    this.funcionarioService.register(this.data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Funcionário salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
   })
  }

  
  observaEmpresa(event: any){
    this.data.idEmpresa = event.target.value;
  }
  
  observaUsuario(event:any){
    this.data.idUsuario = event.target.value;
  }

  getAllEmpresas(){
    this.funcionarioService.getAllEmpresas().subscribe(resp => {
      this.data.idEmpresa = resp[0].id;
      this.empresas = resp;
    })
  }

  getAllUsuarios(){
    this.funcionarioService.getAllUsuarios().subscribe(resp => {
      this.data.idUsuario = resp[0].id
      this.usuarios = resp;
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
    this.funcionarioService.getFuncionarioFilter(this.pesquisa).subscribe(resp => {
      this.funcionarios = resp
    })
  }

}
