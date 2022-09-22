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

  data = {
    usuario: '',
    empresa: ''
  }


  constructor(
    private _registerservice: FuncionarioService,
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
