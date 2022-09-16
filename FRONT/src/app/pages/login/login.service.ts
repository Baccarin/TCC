import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl
  getIpCompleto = environment.getIpCompleto;

  constructor(private http: HttpClient, private router : Router) { }

  login(data:any){   
    return this.http.post(`${this.baseUrl}/login`, data,{headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map( response => response),
        catchError((error)=>this.errorHandler(error))
    );
  }

  errorHandler(error: any): any {
    if (error.status == 200){
      Swal.fire({
        position: 'center',
        title: 'Login realizado com sucesso',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      sessionStorage.setItem('token' , error.error.text);
      this.router.navigate(['/'])
    } else {
      Swal.fire({
        title: 'Login incorreto',
        text: 'Não foi possível realizar o login',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    }
    
  }

}
