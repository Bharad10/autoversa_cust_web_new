import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { VehicleListRoutingModule } from './vehicle-list-routing.module';
import { VehicleListPageComponent } from './vehicle-list-page/vehicle-list-page.component';


@NgModule({
  declarations: [
    VehicleListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VehicleListRoutingModule
  ]
})
export class VehicleListModule { }
