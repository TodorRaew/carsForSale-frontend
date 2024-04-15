import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 42.50210111157619;
  longitude = 27.463975382763866;
  zoom = 12;


  constructor() { }


  ngOnInit() {
    //set burgas coordinates
    var map = L.map('map').setView([this.latitude, this.longitude], this.zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([this.latitude, this.longitude]).addTo(map);

    //bind popup to marker with message the name of the city and street name street gladston 119

    marker.on('click', function (e) {
      marker.bindPopup("<b>гр.Бургас</b><br>ул. Гладстон 119").openPopup();
    }
    );
  }
}
