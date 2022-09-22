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

  public selectEtapa: FormGroup;
  public etapas: any

  constructor(
    private _registerservice: ProjetoService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.selectEtapa = this.formBuilder.group({
      selectEtapa : ['']
    });

    this._registerservice.getEtapas();
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
