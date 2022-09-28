import { Component, OnInit  } from '@angular/core';
import { PessoaService } from './pessoa.service';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    idPessoa: '',
    nome: '',
    email: '',
    sexo: '',
    dataNascimento: ''
  }

  pessoas: any;
  filter: any;

  pesquisa: any;
  sexos: any;

  formModal: any;

  constructor(
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalPessoa'),
      );
      
      this.pessoaService.getAll().subscribe(response =>{
        this.pessoas = response;
      })
      
      this.pessoaService.getSexos().subscribe(response =>{
        this.sexos = response;
        this.data.sexo = response[0];
      })
      
   this.limpaCampos(); 
  }

  limpaCampos(){
    this.data.idPessoa = '';
    this.data.nome = '';
    this.data.email = '';
    this.data.sexo = this.sexos[0];
    this.data.dataNascimento = '';
  }


  openModal(id: any) {
    this.pessoaService.getPessoa(id).subscribe(resp => {
      this.data = resp
    })
    this.formModal.show();
  }

  updatePessoa(data:any){
    this.data.idPessoa = data.id;
    this.pessoaService.atualizarPessoa(data).subscribe(resp => {
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
        this.pessoaService.delete(data).subscribe(resp => {
          this.init();
        })
      }
    })
  }

  onSubmit(data: any) {

    this.pessoaService.register(data).subscribe(resp => {
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
    this.pessoaService.getPessoasFilter(this.pesquisa).subscribe(resp => {
      this.pessoas = resp
    })
  }

  observaSexo(event: any){
    this.data.sexo = event.target.value;
  }

  getAllSexo(){
    this.pessoaService.getSexos().subscribe(resp => {
      this.data.sexo = resp[0];
      this.sexos = resp;
    })
  }

}
