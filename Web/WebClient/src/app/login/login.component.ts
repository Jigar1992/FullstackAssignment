import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

//import { BaseService } from '../services/base.service';
import { CommonService } from '../services/base.service';
import { BaseComponent } from '../services/commonComponent';


@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  userLoginFrm: FormGroup;
  submitted = false;
  hide: Boolean = true;
  constructor(public fb: FormBuilder, inj: Injector) {
    super(inj)
  }

  ngOnInit() {

    this.userLoginFrm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  // Get email error msg
  getErrorMessage() {
    return this.userLoginFrm.get('Email').hasError('required') ? "Email required" :
      this.userLoginFrm.get('Email').hasError('email') ? "Please enter valid email" :
        '';
  }

  // Login user
  loginUser(formData: any) {
    if (this.userLoginFrm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      //this.loaderService.Show();
      // model.LanguageCode = LanguageCode;
      const model = formData.value;
      //const body = JSON.stringify(formData.value);
      const body = {
        username: formData.value.UserName,
        password: formData.value.Password
      }

      debugger
      this.commonService.callApi('Authenticate/login', JSON.stringify(body), 'post', true).then(success => {
        if (success) {
          debugger
          if (success) {
            let tempToken;
            tempToken = "Bearer " + success.token;
            this.setToken('accessToken', tempToken);
            this.setToken('expiration', success.expiration);
            //this.setToken('refresh_token', success.refresh_token);
            this.router.navigate(["/Manufacturer"]);
            // this.popToast('success', 'Login Successful')
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
