import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SendmessageService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  sendEmail(data: any): Observable<any> {
   // var token = sessionStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/sendmail`, data)
      .pipe(
        map((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }
  errorHandler(error: any): any {
    //console.log(error);
    Swal.fire({
      title: 'Failed to send message',
      text: 'Please try again',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: 'red',
    })
  }

}
