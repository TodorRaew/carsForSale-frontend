import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  implements OnInit {
  message: string = '';


  constructor() { }

  ngOnInit(): void {
    this.message = 'ЗА НАС'
  }
}
