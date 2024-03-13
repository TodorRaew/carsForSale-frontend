import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/car/advertisement/advertisement.service';
import { Advertisement } from '../../interfaces/advertisement';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  advertisements: AdvertisementView[] = [];
  displayedColumns: string[] = ['sellerName', 'sellerPhoneNumber', 'makeName', 'modelName', 'fuelType', 'color', 'power', 'yearOfManufacture', 'price'];
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();

  constructor(private advertisementService: AdvertisementService) { 
   
  }

  ngOnInit(): void {
    debugger
    this.advertisementService.getAllAdvertisements()
    .subscribe((advertisements) => {
      debugger
      this.advertisements = advertisements;
      this.dataSource = new MatTableDataSource(advertisements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
