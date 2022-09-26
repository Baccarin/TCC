import { Component, OnInit  } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    nome: '',
    cnpj: ''
  }

  empresas: any;
  filter: any ;
  pesquisa: any;


  constructor(
    private empresaService: EmpresaService,
    private router: Router) { }


  init() {
      this.empresaService.getAll().subscribe(resp => {
        this.empresas = resp;
      })
  }

  ngOnInit() {
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
    this.data.nome = '';
    this.data.cnpj = '';
  }

  navigate(): void {
    this.router.navigate(['/cadastro/empresa'])
  }


  edit(id: any) {
    this.empresaService.getEmpresa(id).subscribe(resp => {
      this.data = resp[0]
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
    this.empresaService.getEmpresaFilter(this.pesquisa).subscribe(resp => {
      this.empresas = resp
    }
    )
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


}
