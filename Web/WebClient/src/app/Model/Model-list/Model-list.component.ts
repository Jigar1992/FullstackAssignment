import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../../services/base.service';
import { BaseComponent } from '../../services/commonComponent';


@Component({
  selector: 'app-Model-list',
  templateUrl: './Model-list.component.html',
  styleUrls: ['./Model-list.component.css']
})
export class ModelListComponent extends BaseComponent implements OnInit {
  modelList: any[];
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

 
    this.commonService.callApi('Model/GetAllModel', JSON.stringify(body), 'post').then(success => {
      
      if (success) {
        debugger
        this.modelList = success;

      } else {
        
      }
    }).catch((e) => {
     
      console.log("there is an error:", e)
    })

  }

   // Delete Model
  deleteModel(id: any) {
    debugger
    if(confirm("Are you sure you want to delete?")){
      debugger
      if (id) {

        const body = {
          Id: id
        }
        this.commonService.callApi('Model/DeleteModel', JSON.stringify(body), 'post', false).then(success => {
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
