import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../../services/base.service';
import { BaseComponent } from '../../services/commonComponent';
import { DatePipe } from '@angular/common'
import { formatDate } from '@angular/common' 


@Component({
  selector: 'app-Model-save',
  templateUrl: './Model-save.component.html',
  styleUrls: ['./Model-save.component.css']
})
export class ModelSaveComponent extends BaseComponent implements OnInit {
  
  modelFrm: FormGroup;
  list: any[];
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
      this.getModel();
    }
    else {
      this.getList();
    }

    this.modelFrm = this.fb.group({
      ModelName: ['', Validators.required],
      ManufacturerId: ['', Validators.required],
      FirstProductionDate: ['', Validators.required]
    });

  }

  
  getList() {
    const body = {
      Id: 0
    }


    this.commonService.callApi('Manufacturer/GetAllManufacturer', JSON.stringify(body), 'post').then(success => {

      if (success) {
        debugger
        this.list = success;

      } else {

      }
    }).catch((e) => {

      console.log("there is an error:", e)
    })

  }

  getModel() {
    const body = {
      Id: parseInt(this.id)
    }

 
    this.commonService.callApi('Model/GetAllModel', JSON.stringify(body), 'post').then(success => {
      
      if (success) {
        debugger
        this.list = success.ManufacturerList;


        setTimeout(() => {                           // <<<---using ()=> syntax
          this.modelFrm.controls['ModelName'].setValue(success.ModelName);
          this.modelFrm.controls['ManufacturerId'].setValue(success.ManufacturerId);
          //var a = this.datepipe.transform(success.FirstProductionDate, 'dd-MM-yyyy');
          this.modelFrm.controls['FirstProductionDate'].setValue(formatDate(success.FirstProductionDate, 'yyyy-MM-dd', 'en'));
        }, 2000)

        

        

      } else {
        
      }
    }).catch((e) => {
     
      console.log("there is an error:", e)
    })

  }


   // Save Model
   saveModel(formData: any) {
    debugger
    // throw validation error
     if (this.modelFrm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      const model = formData.value;
      const body = {
        ModelName: formData.value.ModelName,
        ManufacturerId: parseInt(formData.value.ManufacturerId),
        FirstProductionDate: new Date(formData.value.FirstProductionDate),
        Id: !this.isAddMode ? parseInt(this.id) : 0
      }
       this.commonService.callApi('Model/SaveModel', JSON.stringify(body), 'post', false).then(success => {
        debugger
        if (success) {
          if (success && success.success) {
            alert(success.message);
            this.router.navigate(['/Model'])
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
