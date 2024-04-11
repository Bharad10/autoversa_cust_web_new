import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingStatusFlowRoutingModule } from './booking-status-flow-routing.module';
import { BookingStatusFlowPageComponent } from './booking-status-flow-page/booking-status-flow-page.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { MatExpansionModule } from '@angular/material/expansion'; 


@NgModule({
  declarations: [
    BookingStatusFlowPageComponent
  ],
  imports: [
    CommonModule,
    BookingStatusFlowRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class BookingStatusFlowModule { }
