import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/car/advertisement/advertisement.service';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DioalogComponent } from '../dialog/dialog.component';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';
import { FormComponent } from '../form/form.component';
import { MakeDto } from '../../interfaces/makeDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  advertisements: AdvertisementView[] = [];
  displayedColumns: string[] = ['sellerName', 'sellerPhoneNumber', 'makeName', 'modelName', 'fuelType', 'color', 'power', 'yearOfManufacture', 'price', 'actions'];
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();
  static advertisementId: number = 0;
  makes: MakeDto[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private advertisementService: AdvertisementService,
    private _dialog: MatDialog) {

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

  openDialog(advertisement: AdvertisementView): void {
    debugger
    const dialogRef = this._dialog.open(DioalogComponent, {
      data: advertisement
    });

    console.log(advertisement);
    console.log(dialogRef);

  }

  openDeleteDialog(id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    debugger
    this._dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    HomeComponent.advertisementId = id;
  }

  addAdvertisement(): void {
    this._dialog.open(FormComponent, {
      data: {
        sellerName: '',
        sellerPhoneNumber: '',
        makeName: '',
        modelName: '',
        fuelType: '',
        color: '',
        power: 0,
        yearOfManufacture: 0,
        price: 0,
        id: 0
      }
    });
  }
}
