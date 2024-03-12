import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';



@NgModule({
  declarations: [
    CarComponent,
    AdvertisementComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarComponent
  ]
})
export class CarModule { }
