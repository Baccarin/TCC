import { Component, OnInit  } from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})

export class FuncionarioComponent implements OnInit {

  tempoNotificacao = 2500;

  data = {
    usuario: '',
    empresa: ''
  }

  funcionarios: any;
  filter: any;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router) { }


  init(){
    this.funcionarioService.getAll().subscribe(response =>{
      this.funcionarios = response;
    })
  }

  ngOnInit() {
    this.init();
  }

  onSubmit(data: any) {
    this.funcionarioService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Projeto salvo com sucesso',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
      this.navigate()
    })
  }

  limpaCampos(){
    this.data.usuario = '';
    this.data.empresa = '';
  }

  navigate(): void {
    this.router.navigate(['/register'])
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
        this.funcionarioService.delete(data).subscribe(resp => {
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
