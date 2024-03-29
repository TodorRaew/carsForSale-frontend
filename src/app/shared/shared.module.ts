import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [ContactComponent, AboutComponent, HomeComponent, DioalogComponent, DialogAnimationsComponent, FormComponent],
  imports: [
    CommonModule, RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports: [ContactComponent, AboutComponent, HomeComponent]
})
export class SharedModule { }
