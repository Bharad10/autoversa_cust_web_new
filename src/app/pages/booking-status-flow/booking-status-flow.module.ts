import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingStatusFlowRoutingModule } from './booking-status-flow-routing.module';
import { BookingStatusFlowPageComponent } from './booking-status-flow-page/booking-status-flow-page.component';


@NgModule({
  declarations: [
    BookingStatusFlowPageComponent
  ],
  imports: [
    CommonModule,
    BookingStatusFlowRoutingModule
  ]
})
export class BookingStatusFlowModule { }
