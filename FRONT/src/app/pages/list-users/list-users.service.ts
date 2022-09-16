import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    var token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/db`,{headers: {'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }
  deleteRegister(id:any): Observable<any>{
    var token = sessionStorage.getItem('token');
    return this.http.delete<any>(`${this.baseUrl}/db/${id}`,{headers: {'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
    .pipe(
      map((response) => { 
        return response
      }),catchError((error) => this.handleError(error))
    )
  }
  handleError(error: any): any {
    console.log(error)
   // alert('Registration failed!')
  }

}





