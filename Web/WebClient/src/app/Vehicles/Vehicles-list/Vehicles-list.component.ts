import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../../services/base.service';
import { BaseComponent } from '../../services/commonComponent';


@Component({
  selector: 'app-Vehicles-list',
  templateUrl: './Vehicles-list.component.html',
  styleUrls: ['./Vehicles-list.component.css']
})
export class VehiclesListComponent extends BaseComponent implements OnInit {
  vehiclesList: any[];
  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {
    this.getList();
    
  }

  

  getList() {
    const body = {
      Id: 0
    }

 
    this.commonService.callApi('Vehicles/GetAllVehicles', JSON.stringify(body), 'post').then(success => {
      
      if (success) {
        debugger
        this.vehiclesList = success;

      } else {
        
      }
    }).catch((e) => {
     
      console.log("there is an error:", e)
    })

  }

   // Delete vehicles
  deleteVehicles(id: any) {
    debugger
    if(confirm("Are you sure you want to delete?")){
      debugger
      if (id) {

        const body = {
          Id: id
        }
        this.commonService.callApi('Vehicles/DeleteVehicles', JSON.stringify(body), 'post', false).then(success => {
          if (success) {
            if (success && success.success) {
              alert(success.message);
              this.getList();
            } else {
              alert(success.message);
              //this.popToast('error', success.message)
            }
          } else {
  
          }
        }).catch((e) => {
          console.log("there is an error:", e)
        })
  
      }
    }
    
  


    // throw validation error

  }
  

}
