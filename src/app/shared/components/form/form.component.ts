declare var cloudinary: any;

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { MakeService } from 'src/app/services/make.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Model } from '../../interfaces/model';
import { ModelService } from 'src/app/services/model.service';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  showForm: boolean = false;
  selectedValue: string = "";
  @Output() addedAdvs: EventEmitter<void> = new EventEmitter<void>();

  makes: MakeDto[] = []
  models: Model[] = [];
  fuelTypes: FuelTypeDto[] = [];
  sellerId: number = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private advertisementService: AdvertisementService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    public dialog: MatDialog,
    private modelService: ModelService) {
  }

  formData = new FormGroup({
    sellerName: new FormControl({ value: this.userService.getCurrentUserName(), disabled: true }, [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    makeId: new FormControl("", [Validators.required]),
    modelId: new FormControl("", [Validators.required]),
    fuelTypeId: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required]),
    power: new FormControl("", [Validators.required]),
    yearOfManufacture: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    imageUrl: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    debugger
    const makesSub = this.makeService.getAllMakes()
      .subscribe((makes) => {
        debugger
        this.makes = makes;
      });

    debugger
    const fuelTypesSub = this.fuelTypeService.getAllFuelTypes()
      .subscribe((fuelTypes) => {
        debugger
        this.fuelTypes = fuelTypes;
      });

    debugger
    const userSub = this.userService.getCurrentUserByUsername().subscribe((user) => {
      this.sellerId = user.id
    });

    this.subscriptions.push(makesSub, fuelTypesSub, userSub);
  }

  submitForm() {
    debugger
    const advSub = this.advertisementService.addAdvertisement(this.sellerId, this.formData)
      .subscribe(() => {
        this.addedAdvs.emit();
      });

    this.subscriptions.push(advSub);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    debugger
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onMakeSelectionChange(event: MatSelectChange) {
    debugger
    const selectedMake = event.value;

    if (typeof selectedMake === 'number') {
      const modelsSub = this.modelService.getAllModelsByMakeId(selectedMake).subscribe((models) => {
        debugger
        this.models = models;
      });
      this.subscriptions.push(modelsSub);
    }
    else {
      const modelsSub = this.modelService.getAllModelsByMakeName(selectedMake).subscribe((models) => {
        debugger
        this.models = models;
      });
      this.subscriptions.push(modelsSub);
    }
  }


  openCloudinaryUploader(): void {
    debugger
    cloudinary.openUploadWidget({
      cloudName: 'dvxb1tlbs',
      uploadPreset: 'ml_default',
      sources: ['local'],
      showAdvancedOptions: false,
      cropping: true,
      multiple: false,
      defaultSource: 'local'
    }, (error: Error, result: any) => {
      debugger
      if (!error && result && result.event === "success") {
        debugger
        this.formData.get('imageUrl')?.setValue(result.info.secure_url);
      }
    });
  }
}