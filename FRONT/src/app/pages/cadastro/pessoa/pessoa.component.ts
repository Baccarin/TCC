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


  constructor(
    private _registerservice: PessoaService,
    private router: Router) { }

  ngOnInit() {

  }

  onSubmit(data: any) {

    this._registerservice.register(data).subscribe(resp => {
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
