import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { DioalogComponent } from '../dialog/dialog.component';
import { AdvertisementService } from 'src/app/car/advertisement/advertisement.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dialog-animations',
  templateUrl: './dialog-animations.component.html',
  styleUrls: ['./dialog-animations.component.css'],
})
export class DialogAnimationsComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvertisementView, private advertisementService: AdvertisementService) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    debugger
    this.advertisementService.deleteAdvertisement(HomeComponent.advertisementId)
      .subscribe(() => {
        this.dialogRef.close();
      });

      // refresh the page
      window.location.reload();
  }
}
