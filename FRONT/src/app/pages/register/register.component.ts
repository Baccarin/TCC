import { Component, OnInit  } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data = {
    nome: '',
    dataInicio: '',
    dataFim: '',
    etapa: 'INICIO',
    metodologia: 'XP',
    ativo: Boolean
  }

  constructor(private _registerservice: RegisterService, private router: Router) { }

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
