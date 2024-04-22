import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { User } from '../../interfaces/user';
import { Actions } from '../../interfaces/enums';
import { DioalogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormComponent } from '../form/form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myAdvretisements',
  templateUrl: './myAdvretisements.component.html',
  styleUrls: ['./myAdvretisements.component.css']
})
export class MyAdvertisementsComponent implements OnInit {
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();
  displayedColumns: string[] = ['makeName', 'modelName', 'fuelType', 'color', 'power', 'yearOfManufacture', 'price', 'actions'];
  user: User | undefined;
  message: string = '';
  countRecords: number = 0;

  constructor(private _dialog: MatDialog,
    private advertisementService: AdvertisementService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = this.activatedRoute.snapshot.data['title'];

    debugger
    this.loadUserAndRefresh();
  }

  private refresh() {
    debugger
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
    const dialog = this._dialog.open(DioalogComponent, {
      data: {
        advertisement: advertisement,
        action: Actions.EDIT
      }
    });
    debugger

    dialog.componentInstance.updateConfirmed.subscribe(() => {
      debugger
      this.openSnackBar('Advertisement updated successfully', 'Close');
      this.refresh();
      dialog.close();
    }, (error) => {
      debugger
      this.openSnackBar('Error updating advertisement', 'Close');
    });
  }

  private loadUserAndRefresh() {
    debugger
    const username = this.userService.getCurrentUserName() as string;

    this.advertisementService.getAllMyAdvertisementsWithPagination(username, 0, 5).subscribe({
      next: (advertisementView) => {
        debugger
        this.dataSource = new MatTableDataSource(advertisementView.advertisements);
        this.countRecords = advertisementView.countRecords;
      }
    });
  }

  onPageChange(event: any) {
    this.advertisementService.getAllAdvertisementsWithPagination(event.pageIndex, event.pageSize)
      .subscribe((advertisements) => {
        this.dataSource = new MatTableDataSource(advertisements.advertisements);
      });
  }
}

