import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl
  getIpCompleto = environment.getIpCompleto;

  constructor(private http: HttpClient) { }

  login(data:any):Observable<any>{
    console.log(data);
    return this.http.post(`${this.baseUrl}/login`, data,{headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response)=> response),
      catchError((error)=>this.errorHandler(error))
    );
  }
  ip(): Observable<any>{
    return this.http.get<any>(`${this.getIpCompleto}`)
    .pipe(
      map((response)=> response),
      catchError((error)=>this.errorHandler(error))
    );
  }
  sIp(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/saveip`,data)
    .pipe(
      map((response)=> response),
      catchError((error)=>this.errorHandler(error))
    );
  }
  errorHandler(error: any): any {
    //console.log(error);
    //console.log(error.error.text);
    Swal.fire({
      title: 'Authentication failed',
      text: 'Incorrect username or password',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: 'red',
    })
  }

}
