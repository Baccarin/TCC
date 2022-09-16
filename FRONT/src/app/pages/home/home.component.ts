import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(public _homeService: HomeService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
 
    
  }//fim do ngOnInit


}//fim do export class HomeComponent
