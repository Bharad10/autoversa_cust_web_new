import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { AddressPageComponent } from './address-page/address-page.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    ProfilePageComponent,
    AddressPageComponent,
    ServicesPageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    GoogleMapsModule,
    FormsModule
  ]
})
export class ProfileModule { }
