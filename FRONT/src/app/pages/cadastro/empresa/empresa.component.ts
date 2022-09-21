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

  data = {
    nome: '',
    cnpj: ''
  }


  constructor(
    private _registerservice: EmpresaService,
    private router: Router) { }

  ngOnInit() {

  }

  onSubmit(data: any) {

    this._registerservice.register(data).subscribe(resp => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Empresa salva com sucesso',
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
