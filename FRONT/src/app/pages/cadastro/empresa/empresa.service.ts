import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router : Router) { }


  cabecalho:any = {
    'Authorization' :'',
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/json'
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

  getAll(): Observable<any> {
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/empresa/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getEmpresa(data: any): Observable<any> {
    var postData = {
      id: data
    };
    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/empresa/buscaLista/byId`, postData,{headers: this.cabecalho})      .pipe(
        map((response) => response),
        catchError(async (error) => this.erroHandler(error))
      );
  }

  register(data:any): Observable<any>{    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/empresa/salvar`, data,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }

  delete(data: any): Observable<any> {

    var postData = {
      id: data
    };
    console.log(postData);
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/empresa/deletar`, postData, {headers: this.cabecalho}).pipe(
      map((response) => response),
      catchError(async (error) => this.erroHandler(error))
    );
  }

  erroHandler(error: any): any {
    Swal.fire({
      title: 'Warning!',
      text: "Error",
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: 'red0'
    })
    return

  }
}
