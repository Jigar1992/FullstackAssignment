import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './services/commonComponent';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'WebClient';

  constructor(inj: Injector,public router: Router) {
    super(inj)
  }

  logout() {
    window.localStorage.clear()
    this.router.navigate(["/login"]);
  }
}
