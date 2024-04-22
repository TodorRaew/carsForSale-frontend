import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdvertisementsComponent } from './components/myAdvretisements/myAdvretisements.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { DioalogComponent } from './components/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogAnimationsComponent } from './components/dialog-animations/dialog-animations.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserComponent } from './components/user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MapComponent } from './components/map/map.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { LogoutDialogAnimationComponent } from './components/logout-dialog-animation/logout-dialog-animation.component';

@NgModule({
  declarations: [
    MyAdvertisementsComponent,
    AboutComponent,
    HomeComponent,
    DioalogComponent,
    DialogAnimationsComponent,
    FormComponent,
    UserComponent,
    MapComponent,
    ImageUploadComponent,
    LogoutDialogAnimationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxDropzoneModule,
  ],
  exports: [MyAdvertisementsComponent, AboutComponent, HomeComponent]
})
export class SharedModule { }
