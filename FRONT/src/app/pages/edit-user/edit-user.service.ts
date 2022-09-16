import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getUserId(id:any): Observable<any>{
    var token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/db/${id}`,{headers: {'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }

  updateUser(data:any): Observable<any>{
    var token = sessionStorage.getItem('token');
    var id = sessionStorage.getItem('userId')
    return this.http.post<any>(`${this.baseUrl}/db/${id}`, data,{headers: {'Authorization': token, 'accept':'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }
  //return this.http.post<any>(`https://testedeploys.herokuapp.com/db/${id}`, data,{headers: {'Authorization': token, 'accept':'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})


  vacancies(): Observable<any>{
    var token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/vacancies`,{headers: {'Authorization': token, 'accept':'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }
  handleError(error: any): any {
    console.log(error);
    Swal.fire({
      title: 'Erro',
      text: 'Erro',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: 'red',
    })
  }
}
