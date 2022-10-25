import { Component, OnInit  } from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})

export class FuncionarioComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    id: '',
    idPessoa: '',
    idEmpresa: ''
  }

  funcionarios: any;
  empresas:any;
  filter: any;

  pessoas: any;
  pesquisa: any;
  formModal: any;

  constructor(
    private funcionarioService: FuncionarioService) { }


  init(){
    this.funcionarioService.getAll().subscribe(response =>{
      this.funcionarios = response;
    })

    this.getAllEmpresas();
    this.getAllPessoas();

  }

  ngOnInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalFuncionario'),
    );
    this.init();
  }


  onSubmit() {


    if (this.data.idPessoa == '' || this.data.idPessoa == null || this.data.idPessoa == "undefined" || 
        this.data.idEmpresa == '' || this.data.idEmpresa == null || this.data.idEmpresa == "undefined"){
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


    this.funcionarioService.register(this.data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Funcionário salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
      this.limpaCampos();
   })
  }

  limpaCampos(){
    this.data.idPessoa = '';
    this.data.idEmpresa = '';
  }


  updateFuncionario(data: any) {

    var postData = {
      id: data.id,
      idPessoa: data.idPessoa,
      idEmpresa: data.idEmpresa
    };

    this.funcionarioService.atualizarFuncionario(postData).subscribe(resp => {
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

  openModal(id:any) {
    this.funcionarioService.getFuncionario(id).subscribe(resp => {
      console.log(resp)
      this.data.id = id;
      this.data.idPessoa = resp.pessoa.id;
      this.data.idEmpresa = resp.empresa.id;
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

  observaEmpresa(event: any){
    this.data.idEmpresa = event.target.value;
  }
  
  observaPessoa(event:any){
    this.data.idPessoa = event.target.value;
  }

  getAllEmpresas(){
    this.funcionarioService.getAllEmpresas().subscribe(resp => {
      this.data.idEmpresa = resp[0].id;
      this.empresas = resp;
    })
  }

  getAllPessoas(){
    this.funcionarioService.getAllPessoas().subscribe(resp => {
      this.data.idPessoa = resp[0].id
      this.pessoas = resp;
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
