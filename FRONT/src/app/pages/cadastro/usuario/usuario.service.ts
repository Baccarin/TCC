import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router : Router) { }

  tempoNotificacao: 2500; 

  cabecalho:any = {
    'Authorization' :'',
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/json'
  }

  register(data:any): Observable<any>{    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/usuario/salvar`, data,{headers: this.cabecalho})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.errorHandler(error))
    )
  }

  getAll(): Observable<any> {
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/usuario/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  getAllPessoas(){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.get<any>(`${this.baseUrl}/pessoa/buscaLista`, {headers: this.cabecalho})
      .pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }

  delete(data: any): Observable<any> {

    var postData = {
      idUsuario: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/usuario/deletar`, postData, {headers: this.cabecalho}).pipe(
      map((response) => response),
      catchError(async (error) => this.errorHandler(error))
    );
  }

  getUsuarioById(data: any){
    
    var postData = {
      idUsuario: data
    };

    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/usuario/buscaLista/byId`, postData,{headers: this.cabecalho})
    .pipe(
      map((response) => response),
      catchError((error) => this.errorHandler(error))
    )
  }  

  atualizarUsuario(data: any){
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/usuario/atualizar`, data,{headers: this.cabecalho})
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
        timer: this.tempoNotificacao
      })
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


  getUsuariosFilter(pesquisa: any){
    var postData = {
      texto: pesquisa
    };
    
    this.cabecalho.Authorization = sessionStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/usuario/buscaLista/byTextoGenerico`, postData,{headers: this.cabecalho}).pipe(
        map((response) => response),
        catchError(async (error) => this.errorHandler(error))
      );
  }
}
