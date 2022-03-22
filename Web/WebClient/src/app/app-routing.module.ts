import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManufacturerListComponent } from './Manufacturer/Manufacturer-list/Manufacturer-list.component';
import { ManufacturerSaveComponent } from './Manufacturer/Manufacturer-save/Manufacturer-save.component';

import { ModelSaveComponent } from './Model/Model-save/Model-save.component';
import { ModelListComponent } from './Model/Model-list/Model-list.component';

import { VehiclesSaveComponent } from './Vehicles/Vehicles-save/Vehicles-save.component';
import { VehiclesListComponent} from './Vehicles/Vehicles-list/Vehicles-list.component';
import { CanAuthActivate, CanLoginActivate } from './services/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [CanLoginActivate] },
  { path: 'Manufacturer', component: ManufacturerListComponent, canActivate: [CanAuthActivate] },
  { path: 'Manufacturer-save/:id', component: ManufacturerSaveComponent, canActivate: [CanAuthActivate] },
  { path: 'Manufacturer-save', component: ManufacturerSaveComponent, canActivate: [CanAuthActivate]},
  { path: 'Model', component: ModelListComponent, canActivate: [CanAuthActivate] },
  { path: 'Model-save/:id', component: ModelSaveComponent, canActivate: [CanAuthActivate]},
  { path: 'Model-save', component: ModelSaveComponent, canActivate: [CanAuthActivate]},

  { path: 'Vehicles', component: VehiclesListComponent, canActivate: [CanAuthActivate]},
  { path: 'Vehicles-save/:id', component: VehiclesSaveComponent, canActivate: [CanAuthActivate] },
  { path: 'Vehicles-save', component: VehiclesSaveComponent, canActivate: [CanAuthActivate]},
  //{ path: 'Model-save/:id', component: ManufacturerSaveComponent },
  //{ path: 'Model-save', component: ManufacturerSaveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
