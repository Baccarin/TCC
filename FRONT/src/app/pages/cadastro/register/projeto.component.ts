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

  metodologias = ["Scrum", "Kanban", "FDD", "Crystal", "XP" , "Lean"];

  perguntasScrum = [
  "Tamanho do time se enquadra entre 3 e 9 pessoas? ",
  "Possível realizar reuniões rápidas e diárias? ",
  "Possível realizar entregas dentro do período de vinte e quarenta dias? ",
  "Membros terão acesso a fatos que poderão afetar a organização pro projeto? ",
  "Serão realizadas inspeções pelo responsável periodicamente? ",
  "O time possui é auto-organizado e interdisciplinar? "
  ]

  perguntasCrystal = [
    "Projeto possui um ciclo de duração entre 1 e 3 meses? ",
    "Uma versão poderá ser entregue ao cliente a cada vinte à quarenta dias? ",
    "Os desenvolvedores terão autonomia para escolher quais funcionalidades serão incluídas em cada versão? ",
    "Existem pessoas experientes com a metodologia? ",
    "Uma pessoa poderá assumir mais de um papel dentro do time? "
  ]

  perguntasLean = [
    "Todo processo que não seja relevante para o desenvolvimento será eliminado? ",
    "Decisões serão tomadas o mais tarde possível? ",
    "Uma versão será disponibilizada o mais rápido possível? ",
    "Gerente irá incentivar o progresso, avaliar erros e corrigir o rumo do desenvolvimento? "
  ]

  perguntasKanban = [
    "O fluxo inteiro de trabalho pode ser visualizado? ",
    "O fluxo de trabalho é contínuo? ",
    "Um esquema contendo todas etapas do processo foi desenvolvido? ",
    "Existe uma separação clara entre as etapas? "
    ]



  perguntasXP = [
    "Programadores estimam o esforço necessário para implementar os requisitos definidos pelo cliente? ",
    "Projeto será desenvolvido da forma mais simples possível? ",
    "Desenvolvimento do software será dirigido por testes? ",
    "Programação será em pares? ",
    "Cliente estará disponível para responder às eventuais dúvidas? "
  ]

  perguntasFDD = [
    "Serão mantidas versões de todos os artefatos criados dentro do ciclo de desenvolvimento? ",
    "Em intervalos regulares, serão integradas as funcionalidades terminadas? ",
    "Implementação será orientada por funcionalidades? ",
    "Será construido um diagrama básico de classes? "
  ]

  opcoes = ['sim', 'não']

  etapas: any;
  projetos:any;
  times: any;

  filter: any;

  pesquisa: any;
  formModal: any;
  escolheMetodologiaModal: any;

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


    this.escolheMetodologiaModal = new window.bootstrap.Modal(
      document.getElementById('modalEscolheMetodologia'),
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

  openModalMetodologia(id:any){
    this.projetoService.getProjeto(id).subscribe(resp => {
      this.data = resp
    })
    this.escolheMetodologiaModal.show();
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

    if (data.nome == '' || data.nome == null || data.nome == "undefined" || 
        data.dataInicio == '' || data.dataInicio == null || data.dataInicio == "undefined" ||
        data.dataFim == '' || data.dataFim == null || data.dataFim == "undefined" || 
        data.metodologia == '' || data.metodologia == null || data.metodologia == "undefined" || 
        data.ativo == '' || data.ativo == null || data.ativo == "undefined" || 
        data.idTime == '' || data.idTime == null || data.idTime == "undefined" ){
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

  escolheMetodologia(id:any){
    this.openModalMetodologia(id);
  }

}
