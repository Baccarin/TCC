import { Component, OnInit  } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    id: '',
    nome: '',
    cnpj: ''
  }

  empresas: any;
  filter: any ;
  pesquisa: any;

  formModal: any;


  constructor(
    private empresaService: EmpresaService,
    private router: Router) { }


  init() {
      this.empresaService.getAll().subscribe(resp => {
        this.empresas = resp;
      })
  }

  ngOnInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalEmpresa'),
    );
    this.init();
  }

  onSubmit(data: any) {
    this.empresaService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Empresa salva com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
      this.limpaCampos();
    })
  }

  limpaCampos(){
    this.data.id = '';
    this.data.nome = '';
    this.data.cnpj = '';
  }

  edit(id: any) {
    this.empresaService.getEmpresa(id).subscribe(resp => {
      this.data = resp[0]
    })
  }

  updateEmpresa(data:any){
    this.empresaService.atualizarEmpresa(data).subscribe(resp => {
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
    this.empresaService.getEmpresa(id).subscribe(resp => {
      this.data = resp
    })
    this.formModal.show();
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
    this.empresaService.getEmpresaFilter(this.pesquisa).subscribe(resp => {
      this.empresas = resp
    })
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
        this.empresaService.delete(data).subscribe(resp => {
          this.init();
        })
      }
    })
  }


}
