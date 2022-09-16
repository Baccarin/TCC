import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  register(data:any): Observable<any>{
    var token = sessionStorage.getItem('token');
    return this.http.post<any>(`${this.baseUrl}/newregister`, data,{headers: {'Authorization': token, 'accept':'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }
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
    console.log(error)
    //alert('Registration failed!')
  }
}
