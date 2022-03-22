import { Component, PLATFORM_ID, Injectable, Injector, NgZone, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
//import { BaseComponent } from './../common/commonComponent';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
//import swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";


//import { ToasterService, ToasterConfig } from 'angular2-toaster';
@Injectable({
  providedIn: "root" //use throught application
})
export class CommonService {
  authorised: any = false;
  constructor(injector: Injector,
    public _http: HttpClient,

    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this._apiUrl = this.config.BaseEndpoint;
    this.router = injector.get(Router)


    //  this._http
    //    .get("https://jsonplaceholder.typicode.com/posts")
    //    .subscribe(data => console.log(data), err => console.log(err));
  }
  public router: Router;
  //public swal = swal;
  public config = <any>environment;
  public _apiUrl = "";
  public platformId;

  public getToken(key) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
  }
  public setToken(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }


  /*******************************************************************************************
      @PURPOSE      	: 	Call api.
      @Parameters 	: 	{
            url : <url of api>
            data : <data object (JSON)>
            method : String (get, post)
            isForm (Optional) : Boolean - to call api with form data
            isPublic (Optional) : Boolean - to call api without auth header
          }
  /*****************************************************************************************/
  callApi(url, data, method, isPublic?, isForm?, pagination?, html?): Promise<any> {
    let headers;
    if (isPublic) {
      headers = new HttpHeaders({ 'content-Type': 'application/json' });
    } else if (html) {
      headers = new HttpHeaders({ 'content-Type': 'text/html', 'Authorization': this.getToken('accessToken') });
    } else {
      headers = new HttpHeaders({ 'content-Type': 'application/json', 'Authorization': this.getToken('accessToken') });
    }
    if (isForm) {
      headers = new HttpHeaders({ 'Authorization': this.getToken('accessToken') });
    }
    
    return new Promise((resolve, reject) => {

      if (method == 'post') {
        this._http.post(this._apiUrl + url, data, { headers })
          .subscribe(data => { resolve(data) }, error => {
            debugger
            this.showServerError(error)
          })
      } else if (method == 'get') {
        this._http.get(this._apiUrl + url, { headers: headers, params: data })
          .subscribe(data => { resolve(data) }, error => { this.showServerError(error) })

      }
      else if (method == 'put') {
        this._http.put(this._apiUrl + url, data, { headers })
          .subscribe(data => { resolve(data) }, error => { this.showServerError(error) })
      }
      else if (method == 'delete') {
        this._http.delete(this._apiUrl + url, { headers })
          .subscribe(data => { resolve(data) }, error => { this.showServerError(error) })
      }
      else if (method === 'patch') {
        // let params: { appid: 'id1234', cnt: '5' }

        if (data) {
          this._http.patch(this._apiUrl + url, data, { headers }).subscribe(
            data1 => {
              resolve(data1);
            },
            error => {
              this.showServerError(error);
            }
          );
        }
      }

    })

  }
  
  callApiObservable(url, data) {
    let headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': this.getToken('accessToken')
    });
    return this._http.get(this._apiUrl + url, { headers: headers, params: data }).pipe(map(rsp => { return rsp; }))
  }

  /*****************************************************************************************/
  // @PURPOSE      	: 	To show server error
  /*****************************************************************************************/
  showServerError(e) {
    debugger

    if (e.status == 400) {
     

    } else if (e.status == 403) {
      

    } else if (e.status == 401) {
      this.logout();
    }
    // else{
    //   this.swal({
    //     position: 'center',
    //     type: 'error',
    //     text: 'Internal Server Error',
    //     showConfirmButton: false,
    //     timer: 1800,
    //     customClass: 'custom-toaster'
    //   });
    //   console.log('Internal server error', e);
    // }

  }
  /****************************************************************************/

  logout() {
    this.clearToken()
    this.router.navigate(["/login"]);
  }
  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear()
    }
  }

  getCurrentUser = (force: boolean = false): any => {
    var me: any = this;
    return (this.callApi('api/me', '', 'get'))
      .then((response: any) => {
        me.currentUser = response;
        return me.currentUser;
      });
  }
}


