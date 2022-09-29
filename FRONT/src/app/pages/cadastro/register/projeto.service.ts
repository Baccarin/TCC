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
        title: 'Operação realizada com sucesso',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      Swal.fire({
        title: 'Erro ao salvar cadastro',
        text: error.error.message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
      })
    }
    
  }

  getAll(): Observable<any> {
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/projeto/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  delete(data: any): Observable<any> {

    var postData = {
      idProjeto: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/deletar`, postData, {headers: this.cabecalho}).pipe(
      map((response) => response),
      catchError(async (error) => this.errorHandler(error))
    );
  }

  avancaEtapa(data:any){
    var postData = {
      idProjeto: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/avancaEtapa`, postData, {headers: this.cabecalho}).pipe(
      map((response) => response),
      catchError(async (error) => this.errorHandler(error))
    );
  }


  getProjetoFilter(pesquisa:any){
    var postData = {
      texto: pesquisa
    };
    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/buscaLista/byTextoGenerico`, postData,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getProjeto(data: any){

    var postData = {
      idProjeto: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/buscaById`, postData,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  atualizarProjeto(data:any){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/projeto/atualizar`, data,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }

  getAllEtapas(){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/etapa/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getAllTimes(){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/time/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

}
