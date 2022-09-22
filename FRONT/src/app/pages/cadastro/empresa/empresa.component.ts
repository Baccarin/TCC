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

  empresas: any;
  filter: any ;


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
        timer: 2500
      })
      this.navigate()
    })


  }
  navigate(): void {
    this.router.navigate(['/register'])
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


}
