import { Component, OnInit  } from '@angular/core';
import { ProjetoService } from './projeto.service';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-register',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    nome: '',
    dataInicio: '',
    dataFim: '',
    etapa: 'INICIO',
    metodologia: 'XP',
    ativo: true,
    idTime: ''
  }

  etapas: any;
  projetos:any;
  times: any;

  filter: any;

  pesquisa: any;
  formModal: any;

  constructor(
    private projetoService: ProjetoService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.limpaCampos();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalProjeto'),
    );

    this.projetoService.getAll().subscribe(response =>{
      this.projetos = response;
    })

    this.getAllEtapas();
    this.getAllTimes();
  }

  limpaCampos(){
    this.data.nome = '';
    this.data.dataInicio = '';
    this.data.dataFim = '';
  }

  openModal(id: any) {
    this.projetoService.getProjeto(id).subscribe(resp => {
      this.data = resp
    })
    this.formModal.show();
  }

  observaEtapa(event:any){
    this.data.etapa = event.target.value;
  }

  observaTime(event:any){
    this.data.idTime = event.target.value;
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
        this.projetoService.delete(data).subscribe(resp => {
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

  avancaEtapa(data:any){
    Swal.fire({
      title: "Ateção!",
      text: `Deseja confirmar o avanço de etapa do registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed){
        this.projetoService.avancaEtapa(data).subscribe(resp => {
          this.init();
        })
      }
    })
  }


  onSubmit(data: any) {

    this.projetoService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Projeto salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.init();
    })


  }

  updateProjeto(data:any){
    
    console.log(data)

    var postData = {
      idProjeto: data.id,
      nome: data.nome,
      idTime: data.time,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      etapa: data.etapa,
      metodologia: data.metodologia
    };


    this.projetoService.atualizarProjeto(postData).subscribe(resp => {
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
    this.projetoService.getProjetoFilter(this.pesquisa).subscribe(resp => {
      this.projetos = resp
    })
  }


  getAllEtapas(){
    this.projetoService.getAllEtapas().subscribe(resp => {
      this.data.etapa = resp[0].id;
      this.etapas = resp;
    })
  }

  getAllTimes(){
    this.projetoService.getAllTimes().subscribe(resp => {
      this.data.idTime = resp[0].id;
      this.times = resp;
    })
  }

}
