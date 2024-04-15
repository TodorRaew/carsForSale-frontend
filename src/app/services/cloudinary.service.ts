// import { Injectable } from '@angular/core';
// import { Observable, from, map, catchError } from 'rxjs';
// import { environment } from 'src/environments/environment.development';
// import { Cloudinary } from '@cloudinary/angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class CloudinaryService {

//   constructor(private cloudinary: Cloudinary) { }

//   uploadImage(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('ml_default', environment.cloudinary.uploadPreset);

//     return from(this.cloudinary.uploadUnsigned(formData, environment.cloudinary.uploadPreset)).pipe(
//       map((response: any) => response),
//       catchError(error => {
//         console.error('Error uploading image to Cloudinary: ', error);
//         throw error;
//       })
//     );
//   }
// }
