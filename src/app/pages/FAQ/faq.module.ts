import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { FAQPageComponent } from './faq-page/faq-page.component';
import { MatExpansionModule } from '@angular/material/expansion'; 


@NgModule({
  declarations: [
    FAQPageComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    MatExpansionModule
  ]
})
export class FAQModule { }
