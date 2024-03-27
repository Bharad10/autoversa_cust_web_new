import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleDropRoutingModule } from './schedule-drop-routing.module';
import { ScheduleDropPageComponent } from './schedule-drop-page/schedule-drop-page.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ScheduleDropPageComponent,
    
  ],
  imports: [
    CommonModule,
    ScheduleDropRoutingModule,
    NgSelectModule,
    GoogleMapsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class ScheduleDropModule { }
