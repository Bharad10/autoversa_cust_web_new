import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RescheduleRoutingModule } from './reschedule-routing.module';
import { RescheduleComponentComponent } from './reschedule-component/reschedule-component.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    RescheduleComponentComponent
  ],
  imports: [
    CommonModule,
    RescheduleRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    NgSelectModule
  ]
})
export class RescheduleModule { }
