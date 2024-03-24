import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingStatusFlowPageComponent } from './booking-status-flow-page/booking-status-flow-page.component';

const routes: Routes = [
  {
    path:'',component:BookingStatusFlowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingStatusFlowRoutingModule { }
