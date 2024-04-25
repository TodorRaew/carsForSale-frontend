
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DioalogComponent } from '../dialog/dialog.component';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';
import { FormComponent } from '../form/form.component';
import { MakeDto } from '../../interfaces/makeDto';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Actions } from '../../interfaces/enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['makeName', 'modelName', 'fuelType', 'color', 'power', 'yearOfManufacture', 'price', 'actions'];
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();
  static advertisementId: number = 0;
  makes: MakeDto[] = [];
  isAuthenticated: boolean = false;
  canDelete: boolean = true;
  user: User | undefined;
  message: string = '';
  countRecords: number = 0;
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  currentPage: number = 0;


  constructor(
    private advertisementService: AdvertisementService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.message = this.activatedRoute.snapshot.data['title'];
    debugger
    this.refresh();
    this.loadUser();
  }

  private refresh() {
    debugger
    const advsSub = this.advertisementService.getAllAdvertisementsWithPagination(0, 5)
      .subscribe((advertisementView) => {
        debugger
        this.dataSource = new MatTableDataSource(advertisementView.advertisements);
        this.countRecords = advertisementView.countRecords;

      });

    this.subscriptions.push(advsSub);
  }

  applyFilter(event: Event) {
    debugger
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

    const dialogSub = dialog.componentInstance.deleteConfirmed.subscribe(() => {
      this.deleteAdvertisement(id);
    });

    this.subscriptions.push(dialogSub);
  }

  deleteAdvertisement(id: number) {
    const sub = this.advertisementService.deleteAdvertisement(id)
      .subscribe(() => {
        this.openSnackBar('Обявата е изтрита успешно', 'Затвори');
        this.refresh();
      }, () => {
        this.openSnackBar('Грешка при изтриване на обявата', 'Затвори');
      });

    this.subscriptions.push(sub);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  addAdvertisement(): void {
    const dialog = this._dialog.open(FormComponent, {});

    const dialogSub = dialog.componentInstance.addedAdvs.subscribe(() => {
      this.openSnackBar('Обявата е добавена успешно', 'Затвори');
      this.refresh();
      dialog.close();
    }, () => {
      this.openSnackBar('Грешка при добавяне на обявата', 'Затвори');
    });

    this.subscriptions.push(dialogSub);
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

    const dialogSub = dialog.componentInstance.updateConfirmed.subscribe(() => {
      debugger
      this.openSnackBar('Обявата е редактирана успешно', 'Затвори');
      this.refresh();
      dialog.close();
    }, () => {
      debugger
      this.openSnackBar('Грешка при редактиране на обявата', 'Затвори');
    });

    this.subscriptions.push(dialogSub);
  }

  loadUser() {
    debugger
    const userSub = this.userService.getCurrentUserByUsername().subscribe((user) => {
      debugger
      this.user = user;
    });

    this.subscriptions.push(userSub);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;

    const sub = this.advertisementService.getAllAdvertisementsWithPagination(event.pageIndex, event.pageSize)
      .subscribe((advertisements) => {
        this.dataSource = new MatTableDataSource(advertisements.advertisements);
      });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    debugger
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
