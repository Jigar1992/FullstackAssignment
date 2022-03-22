import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../../services/base.service';
import { BaseComponent } from '../../services/commonComponent';


@Component({
  selector: 'app-Manufacturer-save',
  templateUrl: './Manufacturer-save.component.html',
  styleUrls: ['./Manufacturer-save.component.css']
})
export class ManufacturerSaveComponent extends BaseComponent implements OnInit {
  
  manufacturerFrm: FormGroup;
  submitted = false;
  id: string;
  isAddMode: boolean;

  constructor(inj: Injector, public fb: FormBuilder, public route: ActivatedRoute,
    public router: Router) {
    super(inj)
  }

  ngOnInit() {
    debugger
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.getManufacturer();
    }

    this.manufacturerFrm = this.fb.group({
      ManufacturerName: ['', Validators.required],
      Country: ['', Validators.required]
    });

  }

  

  getManufacturer() {
    const body = {
      Id: parseInt(this.id)
    }

 
    this.commonService.callApi('Manufacturer/GetAllManufacturer', JSON.stringify(body), 'post').then(success => {
      
      if (success) {
        debugger
        this.manufacturerFrm.controls['ManufacturerName'].setValue(success.ManufacturerName);
        this.manufacturerFrm.controls['Country'].setValue(success.Country);

      } else {
        
      }
    }).catch((e) => {
     
      console.log("there is an error:", e)
    })

  }


   // Save manufacturer
   saveManufacturer(formData: any) {
    debugger
    // throw validation error
    if (this.manufacturerFrm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      const model = formData.value;
      const body = {
        ManufacturerName: formData.value.ManufacturerName,
        Country: parseInt(formData.value.Country),
        Id: !this.isAddMode ? parseInt(this.id) : 0
      }
      this.commonService.callApi('Manufacturer/SaveManufacturer', JSON.stringify(body), 'post', false).then(success => {
        debugger
        if (success) {
          if (success && success.success) {
            alert(success.message);
            this.router.navigate(['/Manufacturer'])
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
