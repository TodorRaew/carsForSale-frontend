import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { DioalogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-animations',
  templateUrl: './dialog-animations.component.html',
  styleUrls: ['./dialog-animations.component.css'],
})
export class DialogAnimationsComponent {

  @Output() deleteConfirmed: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvertisementView) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.deleteConfirmed.emit();
    this.onClick();
  }
}
