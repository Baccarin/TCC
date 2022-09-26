import { Component, OnInit  } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    nome: '',
    email: '',
    sexo: 'OUTRO',
    dataNascimento: ''
  }

  pessoas: any;
  filter: any;

  pesquisa: any;

  constructor(
    private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.pessoaService.getAll().subscribe(response =>{
      this.pessoas = response;
    })
   this.limpaCampos(); 
  }

  limpaCampos(){
    this.data.nome = '';
    this.data.email = '';
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
  navigate(): void {
    this.router.navigate(['/register'])
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

}
