import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  clique() {
    Swal.fire({
      title: '<strong>Navigate</strong>',
      html:
        `
            <hr class="dropdown-divider">

            <a class="dropdown-item d-flex align-items-center" href="/">
              <i class="bi bi-house"></i>
              <span>&nbsp;Home</span>
            </a>

            <hr class="dropdown-divider">
          
            <a class="dropdown-item d-flex align-items-center" href="/location">
              <i class="bi bi-geo-alt"></i>
              <span>&nbsp;Localization</span>
            </a>
         
            <hr class="dropdown-divider">
         


            <a class="dropdown-item d-flex align-items-center" href="/tutorials">
              <i class="bi bi-book"></i>
              <span>&nbsp;Tutorials</span>
            </a>
         
            <a class="dropdown-item d-flex align-items-center" href="/metodologias/xp">
            <i class="bi bi-envelope-check"></i>
              <span>&nbsp;XP</span>
            </a>

            <a class="dropdown-item d-flex align-items-center" href="/tutorials/recaptcha-with-angular">
            <i class="bi bi-google"></i>
              <span>&nbsp;aAAAAA</span>
            </a>

            <hr class="dropdown-divider">

            <a class="dropdown-item d-flex align-items-center" href="/profile">
              <i class="bi bi-person"></i>
              <span>&nbsp;My resume</span>
            </a>

            <hr class="dropdown-divider">
         
            <a class="dropdown-item d-flex align-items-center" href="/payment">
              <i class="bi bi-credit-card"></i>
              <span>&nbsp;Payment</span>
            </a>

            <hr class="dropdown-divider">
         
            <a class="dropdown-item d-flex align-items-center" href="/sendmessage">
              <i class="bi bi-envelope-check"></i>
              <span>&nbsp;Send me a message</span>
            </a>

            <hr class="dropdown-divider">
 
            <a class="dropdown-item d-flex align-items-center" href="/notes">
              <i class="bi bi-lock"></i>
              <span>&nbsp;Restricted</span>
            </a>

            <a class="dropdown-item d-flex align-items-center" href="/notes">
              <i class="bi bi-card-text"></i>
              <span>&nbsp;Notes</span>
            </a>
  
            <a class="dropdown-item d-flex align-items-center" href="/register">
              <i class="bi bi-person"></i>
              <span>&nbsp;Register</span>
            </a>
        
            <a class="dropdown-item d-flex align-items-center" href="/list-users">
              <i class="bi bi-book"></i>
              <span>&nbsp;List Users</span>
            </a>
        
            <a class="dropdown-item d-flex align-items-center" href="/vacancies">
              <i class="bi bi-ui-checks"></i>
              <span>&nbsp;Vacancies</span>
            </a>

            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
          </a>

          <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>

        `
      ,
      showConfirmButton: false,
      showCloseButton: true,

    })
  }

}
