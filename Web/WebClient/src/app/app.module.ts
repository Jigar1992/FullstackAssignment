

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManufacturerListComponent } from './Manufacturer/Manufacturer-list/Manufacturer-list.component';
import { CommonModule } from '@angular/common'
import { ManufacturerSaveComponent } from './Manufacturer/Manufacturer-save/Manufacturer-save.component';
import { ModelListComponent } from './Model/Model-list/Model-list.component';
import { ModelSaveComponent } from './Model/Model-save/Model-save.component';
import { DatePipe } from '@angular/common';

import { VehiclesSaveComponent } from './Vehicles/Vehicles-save/Vehicles-save.component';
import { VehiclesListComponent } from './Vehicles/Vehicles-list/Vehicles-list.component';
import {
  CanLoginActivate, CanAuthActivate
} from './services/auth.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManufacturerListComponent,
    ManufacturerSaveComponent,
    ModelListComponent,
    ModelSaveComponent,
    VehiclesListComponent,
    VehiclesSaveComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [DatePipe,CanLoginActivate,
    CanAuthActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
