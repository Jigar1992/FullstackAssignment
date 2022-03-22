import { Component, OnInit, PLATFORM_ID, Injector, NgZone, APP_ID } from '@angular/core';
import { TransferState, makeStateKey, Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonService } from './base.service';
//import { LookupService } from './lookup.service';
//import { ErrorMessages } from './errorMessages';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import { NgxSpinnerService } from 'ngx-spinner';



//import swal from 'sweetalert2'
import * as jQuery from 'jquery';
import * as moment from 'moment';

//import { Broadcaster } from './broadCaster';
declare var jquery: any;
declare var $: any;
declare var WOW: any;

@Component({
  selector: 'parent-comp',
  template: ``,
  providers: []
})

export class BaseComponent {

  constructor(injector: Injector) {

    this.router = injector.get(Router)
    this.platformId = injector.get(PLATFORM_ID)
    this.appId = injector.get(APP_ID)
    this.commonService = injector.get(CommonService)
    //this.lookupService = injector.get(LookupService)
    //this.errorMessage = injector.get(ErrorMessages)
    //this.http = injector.get(HttpClient)
    this.titleService = injector.get(Title)
    this.metaService = injector.get(Meta)
    this.activatedRoute = injector.get(ActivatedRoute)
    //this.modalService = injector.get(BsModalService)
    // this.BsModalRef = injector.get(BsModalRef)
    this.baseUrl = this.commonService._apiUrl;
    //this.spinner = injector.get(NgxSpinnerService)

    //this.broadcaster = injector.get(Broadcaster);
    this.isBrowser();
    //console.log('Your current Environment is :', environment)
  }
  public activatedRoute: ActivatedRoute;
  //public errorMessage: ErrorMessages
  //public modalService: BsModalService
  //public swal = swal;
  public titleService: Title
  public metaService: Meta
  public platformId: any;
  public appId: any;
  //public http = this.http;
  public router: Router;
  public commonService: CommonService;
  //public lookupService: LookupService;
  public baseUrl;

  public $ = jQuery;
  //public spinner: NgxSpinnerService
  //public broadcaster: Broadcaster;

  // public BsModalRef : BsModalRef;

  // *************************************************************//
  //@Purpose : To check server or browser
  //*************************************************************//
  isBrowser() {
    return true;
    //if (isPlatformBrowser(this.platformId)) {
    //    new WOW().init();
    //    return true;
    //} else {
    //    return false;
    //}
  }


  // *************************************************************//
  //@Purpose : We can use following function to use localstorage
  //*************************************************************//
  setToken(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }
  getToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
  }
  removeToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem(key);
    }
  }
  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear()
    }
  }
  //*************************************************************//

  //*************************************************************//
  //@Purpose : We can use following function to use Toaster Service.
  //*************************************************************//
  popToast(type, title) {
    //swal({
    //    position: 'center',
    //    type: type,
    //    text: title,
    //    showConfirmButton: false,
    //    timer: 3000,
    //    customClass: 'custom-toaster'
    //})
  }



  /****************************************************************************
  @PURPOSE      : To restrict or allow some values in input.
  @PARAMETERS   : $event
  @RETURN       : Boolen
  ****************************************************************************/
  RestrictSpace(e) {
    if (e.keyCode == 32) {
      return false;
    } else {
      return true;
    }
  }

  AllowNumbers(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    if (e.which === 43 || e.which === 45) {
      return true;
    }
    if (e.which === 36 || e.which === 35) {
      return true;
    }
    if (e.which === 37 || e.which === 39) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  AllowChar(e) {
    if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 8) {
      return true
    } else {
      return false
    }
  }
  /****************************************************************************/


  /****************************************************************************/
  //@Logout
  /****************************************************************************/
  logout() {
    var temp = {
      ss_id: '',
      ss_pass: '',
      remember: false
    };
    if (this.getToken('ss_id') && this.getToken('ss_pass')) {
      temp.ss_id = this.getToken('ss_id')
      temp.ss_pass = this.getToken('ss_pass')
      temp.remember = true;
    }
    this.clearToken()
    //console.log("temp", temp)
    if (temp.remember) {
      this.setToken('ss_id', temp.ss_id);
      this.setToken('ss_pass', temp.ss_pass);
    }
    this.router.navigate(["/public/login"]);
  }
  /****************************************************************************/

  /****************************************************************************
  @PURPOSE      : To show validation message
  @PARAMETERS   : <field_name, errorObj?>
  @RETURN       : error message.
  ****************************************************************************/
  showError(field, errorObj?) {
    //return this.errorMessage.getError(field, errorObj)
  }
  /****************************************************************************/
  getProfile() {
    const url = this.getToken("ss_pic");
    if (url == null || url === ' ') {
      return 'assets/images/NoProfile.png'
    } else {
      return url;
    }
  }

  /****************************************************************************
  //For Side menu toggle
  /****************************************************************************/
  slideLeft() {
    $("body").addClass("slide-open");
  }
  removeSlide() {
    $("body").removeClass("slide-open");
  }
  slideClose() {
    $("body").removeClass("slide-open");
  }
  /****************************************************************************/

  // *************************************************************//
  //@Purpose : To get Current timestamp
  //*************************************************************//
  getTimeStap() {
    let timeStamp;
    timeStamp = moment().unix();

































    return timeStamp.toString();
  }

}
