import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    // Swal.fire({
    //   title: 'Página em desenvolvimento!',
    //   icon: 'warning',
    //   confirmButtonColor: '#0062d3',
    //   confirmButtonText: 'Ok'
    // })
  }
  voltar(){
    this.router.navigate(['/']);
  }

}
