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

  data = {
    nome: '',
    email: '',
    sexo: 'Não informado',
    dataNascimento: ''
  }

  pessoas: any;
  filter: any;

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
  }

  edit(id: any) {

  }

  delete(id: any) {
    Swal.fire({
      title: "Warning!",
      text: `Do you really want to delete ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Yes, is it!'
    }).then((result) => {

    })
  }

  onSubmit(data: any) {

    this.pessoaService.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Projeto salvo com sucesso',
        showConfirmButton: false,
        timer: 2500
      })
      this.navigate()
    })


  }
  navigate(): void {
    this.router.navigate(['/register'])
  }


}
