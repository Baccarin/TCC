import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.baseUrl;
 

  constructor(private http: HttpClient) { }
 
  errorHandler(error:any):Observable<any>{
    console.log(error);
    return error;
  }
  
}
