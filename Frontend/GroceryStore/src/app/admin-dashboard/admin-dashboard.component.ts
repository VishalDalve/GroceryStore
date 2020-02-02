import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { } from "googlemaps";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap', { static: false }) gmapElement: any;
  map: google.maps.Map; google
  mapProp: any;
  currentLat: any;
  currentLong: any;
  marker: any;
  constructor() { }

  ngOnInit() {
    this.mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);

  }


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });

      google.maps.event.addListener(this.marker, 'click', function (marker) {
        console.log('marker', marker);
        const url = 'https://www.google.com/maps/search/?api=1&query=' + marker.latLng.lat() + ',' + marker.latLng.lng();
        window.open(url);
      }
      );

    }
    else {
      this.marker.setPosition(location);
    }
  }

}
