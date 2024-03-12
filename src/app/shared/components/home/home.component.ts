import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/car/advertisement/advertisement.service';
import { Advertisement } from '../../interfaces/advertisement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  advertisements: Advertisement[] = [];

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    debugger
    this.advertisementService.getAllAdvertisements().subscribe((advertisements: Advertisement[]) => {
      this.advertisements = advertisements;
    });
  }
}
