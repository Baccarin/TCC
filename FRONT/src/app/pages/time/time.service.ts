import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  insertNote(data: any): Observable<any> {
    var token = sessionStorage.getItem('token');
    return this.http.post<any>(`${this.baseUrl}/notes`, data, { headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }).pipe(
      map((response) => response),
      catchError(async (error) => this.erroHandler(error))
    );
  }

  getNote(id: any): Observable<any> {
    var token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/notes/${id}`, { headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
      .pipe(
        map((response) => response),
        catchError(async (error) => this.erroHandler(error))
      );
  }
  getAll(): Observable<any> {
    var token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/notes`, { headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
      .pipe(
        map((response) => response),
        catchError(async (error) => this.erroHandler(error))
      );
  }
  delNote(id: any): Observable<any> {
    var token = sessionStorage.getItem('token');
    return this.http.delete<any>(`${this.baseUrl}/notes/${id}`, { headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }).pipe(
      map((response) => response),
      catchError(async (error) => this.erroHandler(error))
    );
  }

  erroHandler(error: any): any {
    //console.log(error);
    //console.log(error.error);
    // var err = error.error;
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
