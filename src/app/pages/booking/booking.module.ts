import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { GoogleMapsModule } from '@angular/google-maps';

import {MatTooltipModule} from '@angular/material/tooltip';






@NgModule({
  declarations: [
    BookingPageComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatExpansionModule,
    FormsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatInputModule,
    GoogleMapsModule,
    MatTooltipModule
  ]
})
export class BookingModule { }
