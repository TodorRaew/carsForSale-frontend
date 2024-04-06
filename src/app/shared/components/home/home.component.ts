import { Component, OnInit } from '@angular/core';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DioalogComponent } from '../dialog/dialog.component';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';
import { FormComponent } from '../form/form.component';
import { MakeDto } from '../../interfaces/makeDto';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Actions } from '../../interfaces/enums';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['sellerName', 'sellerPhoneNumber', 'makeName', 'modelName', 'fuelType', 'color', 'power', 'yearOfManufacture', 'price', 'actions'];
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();
  static advertisementId: number = 0;
  makes: MakeDto[] = [];
  isAuthenticated: boolean = false;


  constructor(
    private advertisementService: AdvertisementService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    debugger
    this.refresh();
  }

  private refresh() {
    this.advertisementService.getAllAdvertisements()
      .subscribe((advertisements) => {
        debugger
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

  openDialog(advertisement: AdvertisementView) {
    debugger
    this._dialog.open(DioalogComponent, {
      data: {
        advertisement: advertisement,
        action: Actions.VIEW
      }
    });
  }

  openDeleteDialog(id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog = this._dialog.open(DialogAnimationsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { advertisementId: id }
    });

    dialog.componentInstance.deleteConfirmed.subscribe(() => {
      this.deleteAdvertisement(id);
    });
  }

  deleteAdvertisement(id: number) {
    this.advertisementService.deleteAdvertisement(id)
      .subscribe(() => {
        this.openSnackBar('Advertisement deleted successfully', 'Close');
        this.refresh();
      }, (error) => {
        this.openSnackBar('Error deleting advertisement', 'Close');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  addAdvertisement(): void {
    const dialog = this._dialog.open(FormComponent, {});

    dialog.componentInstance.addedAdvs.subscribe(() => {
      this.openSnackBar('Advertisement added successfully', 'Close');
      this.refresh();
      dialog.close();
    }, (error) => {
      this.openSnackBar('Error adding advertisement', 'Close');
    });
  }

  onEditAdvertisementHandler(advertisement: AdvertisementView) {
    debugger
    this._dialog.open(DioalogComponent, {
      data: {
        advertisement: advertisement,
        action: Actions.EDIT
      }
    });
  }
}
