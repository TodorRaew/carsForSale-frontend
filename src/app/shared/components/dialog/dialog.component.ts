import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvertisementView } from '../../interfaces/advertisement.view';
import { FormGroup, FormControl } from '@angular/forms';
import { Actions } from '../../interfaces/enums';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { UserService } from 'src/app/services/user/user.service';
import { MakeDto } from '../../interfaces/makeDto';
import { FuelTypeDto } from '../../interfaces/fuelTypeDto';
import { MakeService } from 'src/app/services/make.service';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { ModelService } from 'src/app/services/model.service';
import { Model } from '../../interfaces/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dioalog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DioalogComponent implements OnInit, OnDestroy {
  title: string = 'Преглед на обява';
  buttonTitle: string = 'Затвори';
  action: string = 'view';
  sellerId: number = 0;
  makes: MakeDto[] = []
  models: Model[] = [];
  fuelTypes: FuelTypeDto[] = [];
  dataSource: MatTableDataSource<AdvertisementView> = new MatTableDataSource();
  subscriptions: Subscription[] = [];

  @Output() updateConfirmed: EventEmitter<void> = new EventEmitter<void>();



  visibilityDialogFormGroup = new FormGroup({
    sellerName: new FormControl({ value: '', disabled: true }, []),
    phone: new FormControl({ value: '', disabled: true }, []),
    makeName: new FormControl({ value: '', disabled: true }, []),
    modelName: new FormControl({ value: '', disabled: true }, []),
    fuelTypeName: new FormControl({ value: '', disabled: true }, []),
    color: new FormControl({ value: '', disabled: true }, []),
    power: new FormControl({ value: '', disabled: true }, []),
    yearOfManufacture: new FormControl({ value: '', disabled: true }, []),
    price: new FormControl({ value: '', disabled: true }, []),
    imageUrl: new FormControl({ value: '', disabled: true }, []),
  });

  constructor(public dialogRef: MatDialogRef<DioalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private advertisementService: AdvertisementService,
    private userService: UserService,
    private makeService: MakeService,
    private fuelTypeService: FuelTypeService,
    private _snackBar: MatSnackBar,
    private modelService: ModelService) {
  }

  ngOnInit(): void {
    debugger
    const makesSub = this.makeService.getAllMakes()
      .subscribe((makes) => {
        debugger
        this.makes = makes;
      });

    debugger
    // load filtered models by make
    const modelsSub = this.modelService.getAllModelsByMakeName(this.data.advertisement.makeName)
      .subscribe((models) => {
        debugger
        this.models = models;
      });


    debugger
    const fuelTypesSub = this.fuelTypeService.getAllFuelTypes()
      .subscribe((fuelTypes) => {
        debugger
        this.fuelTypes = fuelTypes;
      });

    debugger
    if (this.data.action === Actions.EDIT) {
      this.title = 'Редакция на обява'
      this.action = 'edit';
      this.visibilityDialogFormGroup.enable();
      this.visibilityDialogFormGroup.controls.sellerName.disable();
    }

    debugger
    this.visibilityDialogFormGroup.setValue({
      sellerName: this.data.advertisement.sellerName,
      phone: this.data.advertisement.sellerPhoneNumber,
      makeName: this.data.advertisement.makeName,
      modelName: this.data.advertisement.modelName,
      fuelTypeName: this.data.advertisement.fuelType,
      color: this.data.advertisement.color,
      power: this.data.advertisement.power,
      yearOfManufacture: this.data.advertisement.yearOfManufacture,
      price: this.data.advertisement.price,
      imageUrl: this.data.advertisement.image
    });

    this.sellerId = this.data.advertisement.createdBy;
    this.subscriptions.push(makesSub, modelsSub, fuelTypesSub);
  }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }

  onCancelClick() {
    debugger
    this.onNoClick();
  }

  updateRecord(): void {

    // let makeId = this.makes.find(m => m.name === this.visibilityDialogFormGroup.value.makeName && m.modelName === this.visibilityDialogFormGroup.value.modelName)?.id;
    let makeId = this.makes.find(m => m.name === this.visibilityDialogFormGroup.value.makeName)?.id;

    let modelId = this.models.find(m => m.name === this.visibilityDialogFormGroup.value.modelName)?.id;

    let fuelTypeId = this.fuelTypes.find(f => f.name === this.visibilityDialogFormGroup.value.fuelTypeName)?.id;

    debugger
    const advSub = this.advertisementService.updateAdvertisement(makeId, modelId, fuelTypeId, this.sellerId, this.data.advertisement.id, this.visibilityDialogFormGroup)
      .subscribe(() => {
        debugger
        this.updateConfirmed.emit();
      });

    this.subscriptions.push(advSub);
  }

  onMakeSelectionChange(event: MatSelectChange) {
    debugger
    const selectedMake = event.value;
    // Извикайте вашата услуга за връщане на моделите в зависимост от избраната марка
    const modelSub = this.modelService.getAllModelsByMakeName(selectedMake).subscribe((models) => {
      debugger
      this.models = models;
    });

    this.subscriptions.push(modelSub);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    debugger
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
