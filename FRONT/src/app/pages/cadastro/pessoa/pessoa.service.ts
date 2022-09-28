import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router : Router) { }

  tempoNotificacao = 2500;

  cabecalho:any = {
    'Authorization' :'',
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/json'
  }

  register(data:any): Observable<any>{    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/pessoa/salvar`, data,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }

  getAll(): Observable<any> {
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/pessoa/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }


  delete(data: any): Observable<any> {

    var postData = {
      idPessoa: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/pessoa/deletar`, postData, {headers: this.cabecalho}).pipe(
      map((response) => response),
      catchError(async (error) => this.errorHandler(error))
    );
  }

  atualizarPessoa(data:any){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/pessoa/atualizar`, data,{headers: this.cabecalho})
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
        title: 'Operação realizada com sucesso',
        icon: 'success',
        showConfirmButton: false,
        timer: this.tempoNotificacao
      })
    } else {
      Swal.fire({
        title: 'Operação não pode ser realizada.',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    }
    
  }

  getPessoasFilter(pesquisa:any){
    var postData = {
      texto: pesquisa
    };
    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/pessoa/buscaLista/byTextoGenerico`, postData,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getSexos(){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get(`${this.baseUrl}/pessoa/buscaLista/sexos`,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getPessoa(data: any){

    var postData = {
      idPessoa: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/pessoa/buscaById`, postData,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

}
