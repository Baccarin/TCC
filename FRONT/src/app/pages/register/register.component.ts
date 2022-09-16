import { Component, OnInit  } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';



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

  public selectEtapa: FormGroup;
  public etapas: any

  constructor(
    private _registerservice: RegisterService,
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
