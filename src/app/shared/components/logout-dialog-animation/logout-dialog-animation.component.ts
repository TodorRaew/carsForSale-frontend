import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog-animation',
  templateUrl: './logout-dialog-animation.component.html',
  styleUrls: ['./logout-dialog-animation.component.css']
})
export class LogoutDialogAnimationComponent {

  @Output() logoutConfirmed: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<LogoutDialogAnimationComponent>) { }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.logoutConfirmed.emit();
    this.cancel();
  }
}
