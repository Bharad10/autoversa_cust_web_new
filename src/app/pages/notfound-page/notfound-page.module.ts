import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundPageRoutingModule } from './notfound-page-routing.module';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';


@NgModule({
  declarations: [
    NotfoundPageComponent
  ],
  imports: [
    CommonModule,
    NotfoundPageRoutingModule
  ]
})
export class NotfoundPageModule { }
