import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule, 
    RouterModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { 

}
