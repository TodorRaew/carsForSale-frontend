import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  implements OnInit {
  message: string = '';


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.message = this.activatedRoute.snapshot.data['title'];
  }
}
