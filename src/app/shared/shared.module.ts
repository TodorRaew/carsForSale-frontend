import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [ContactComponent, AboutComponent, HomeComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ContactComponent, AboutComponent, HomeComponent]
})
export class SharedModule { }
