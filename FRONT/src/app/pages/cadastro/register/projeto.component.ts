import { Component, OnInit  } from '@angular/core';
import { ProjetoService } from './projeto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';



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
    ativo: true
  }

  projetos:any;
  filter: any;

  pesquisa: any;

  constructor(
    private projetoService: ProjetoService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.projetoService.getAll().subscribe(response =>{
      this.projetos = response;
    })
  }

  limpaCampos(){
    this.data.nome = '';
    this.data.dataInicio = '';
    this.data.dataFim = '';
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

}
