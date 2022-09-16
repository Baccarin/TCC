import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  lat: number = 24.6217017 ;
  long: number = -62.7976359;

  constructor() { }


  ngAfterViewInit(): void {
  
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center:  [this.long,this.lat], // starting position [lng, lat]s
      zoom: 2 // starting zoom
      });
     
      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      console.log(this.lat);
      this.long = position.coords.longitude;
      console.log(this.long);
     });
    }
   else {
    alert("Geolocation is not supported by this browser.");
    }
   }
 

 
   


 
}//end export
















