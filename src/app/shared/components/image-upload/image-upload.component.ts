import { Component } from '@angular/core';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
    files: File[] = [];

  constructor(private advService: AdvertisementService) { }

  onSelect(event: any) {
    debugger
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
