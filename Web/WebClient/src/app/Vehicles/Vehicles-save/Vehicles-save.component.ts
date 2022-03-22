import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../../services/base.service';
import { BaseComponent } from '../../services/commonComponent';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-Vehicles-save',
  templateUrl: './Vehicles-save.component.html',
  styleUrls: ['./Vehicles-save.component.css']
})
export class VehiclesSaveComponent extends BaseComponent implements OnInit {

  vehiclesFrm: FormGroup;
  ModelList: any[];
  VehicleStatusList: any[];
  submitted = false;
  id: string;
  isAddMode: boolean;

  constructor(inj: Injector, public fb: FormBuilder, public route: ActivatedRoute,
    public router: Router, public datepipe: DatePipe) {
    super(inj)
  }

  ngOnInit() {
    debugger
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.getVehicles();
    }
    else {
      this.getModelList();
      this.getVehiclesStatusList();
    }

    this.vehiclesFrm = this.fb.group({
      StatusId: [0, Validators.required],
      ModelId: [0, Validators.required],
      Year: [0, Validators.required],
      Colour: ['', Validators.required]
    });

  }


  getModelList() {
    const body = {
      Id: 0
    }


    this.commonService.callApi('Model/GetAllModel', JSON.stringify(body), 'post').then(success => {

      if (success) {
        debugger
        this.ModelList = success;

      } else {

      }
    }).catch((e) => {

      console.log("there is an error:", e)
    })

  }

  getVehiclesStatusList() {
    const body = {
      Id: 0
    }


    this.commonService.callApi('Vehicles/GetAllVehiclesStatus', JSON.stringify(body), 'post').then(success => {

      if (success) {
        debugger
        this.VehicleStatusList = success;

      } else {

      }
    }).catch((e) => {

      console.log("there is an error:", e)
    })

  }

  getVehicles() {
    const body = {
      Id: parseInt(this.id)
    }


    this.commonService.callApi('Vehicles/GetAllVehicles', JSON.stringify(body), 'post').then(success => {

      if (success) {
        debugger
        this.VehicleStatusList = success.VehicleStatusList;
        this.ModelList = success.ModelList;

        this.vehiclesFrm.controls['StatusId'].setValue(success.StatusId);
        this.vehiclesFrm.controls['ModelId'].setValue(success.ModelId);
        this.vehiclesFrm.controls['Year'].setValue(success.Year);
        this.vehiclesFrm.controls['Colour'].setValue(success.Colour);






      } else {

      }
    }).catch((e) => {

      console.log("there is an error:", e)
    })

  }


  // Save Vehicles
  saveVehicles(formData: any) {
    debugger
    // throw validation error
    if (this.vehiclesFrm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      const model = formData.value;
      const body = {
        StatusId: parseInt(formData.value.StatusId),
        ModelId: parseInt(formData.value.ModelId),
        Year: parseInt(formData.value.Year),
        Colour: formData.value.Colour,
        Id: !this.isAddMode ? parseInt(this.id) : 0
      }
      this.commonService.callApi('Vehicles/SaveVehicles', JSON.stringify(body), 'post', false).then(success => {
        debugger
        if (success) {
          if (success && success.success) {
            alert(success.message);
            this.router.navigate(['/Vehicles'])
          } else {
            //this.popToast('error', success.message)
          }
        } else {

        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })

    }
  }

}
