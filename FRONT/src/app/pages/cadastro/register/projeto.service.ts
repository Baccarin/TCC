import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router : Router) { }


  cabecalho:any = {
    'Authorization' :'',
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/json'
  }

  register(data:any): Observable<any>{    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/salvar`, data,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }

  errorHandler(error: any): any {
    if (error.status == 200){
      Swal.fire({
        position: 'center',
        title: 'Cadastro salvo com sucesso',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      sessionStorage.setItem('token' , error.error.text);
      this.router.navigate(['/'])
    } else {
      Swal.fire({
        title: 'Erro ao salvar cadastro',
        text: 'Não foi possível salvar o registro.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    }
    
  }

  getEtapas(){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get(`${this.baseUrl}/etapa/buscaLista`,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        console.log("teste")
        console.log(response)
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }
}
