import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';

@Component({
  selector: 'app-dioalog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DioalogComponent {

  constructor(public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvertisementView) { 
    }

    onNoClick(): void {
      debugger
      this.dialogRef.close();
    }
}
