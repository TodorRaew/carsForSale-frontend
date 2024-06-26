import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carsForSale';

  constructor() { }

  ngOnInit() {
    const cld = new Cloudinary({ cloud: { cloudName: 'dvxb1tlbs' } });
  }
}
