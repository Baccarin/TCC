import { Component, OnInit } from '@angular/core';
import { ProjetoService } from './projeto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class ProjetoComponent implements OnInit {

  data = {
    nome: '',
    dataInicio: '',
    dataFim: '',
    etapa: '',
    metodologiaAplicada: '',
    ativo: ''

  }

  constructor(private projetoService: ProjetoService, private router: Router) { }

  ngOnInit() {
    this.projetoService.vacancies().subscribe(resp => {
    })

  }

  onChange(event: any) {

  }

  onChangeAvatar(event: any) {

  }
  onSubmit(data: any) {

    data = new FormData();

    data.append('nome', this.data.nome)
    data.append('dataInicio', this.data.dataInicio)
    data.append('dataFim', this.data.dataFim)
    data.append('etapa', this.data.etapa)
    data.append('metodologiaAplicada', this.data.metodologiaAplicada)
    data.append('ativo', this.data.ativo)

    this.projetoService.register(data).subscribe(resp => {
      // console.log(resp)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your register has been saved',
        showConfirmButton: false,
        timer: 2500
      })
      this.navigate()
    })


  }
  navigate(): void {
    this.router.navigate(['/list-users'])
  }
  alertPersonalizado() {
    Swal.fire({
      title: 'Registration successfully completed!',
      text: 'Click ok and view your record.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: 'green',
    })
  }



}
