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

  data = {
    nome: '',
    dataInicio: '',
    dataFim: '',
    etapa: 'INICIO',
    metodologia: 'XP',
    ativo: Boolean
  }

  projetos:any;
  filter: any;

  constructor(
    private projetoService: ProjetoService,
    private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.projetoService.getAll().subscribe(response =>{
      this.projetos = response;
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

    this.projetoService.register(data).subscribe(resp => {
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
