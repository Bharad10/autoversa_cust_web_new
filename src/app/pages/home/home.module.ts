import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './sections/banner/banner.component';
import { BrandsComponent } from './sections/brands/brands.component';
import { ServiceComponent } from './sections/service/service.component';
import { HowItWorksComponent } from './sections/how-it-works/how-it-works.component';
import { HappyClientsComponent } from './sections/happy-clients/happy-clients.component';

import { YellowSectionComponent } from './sections/yellow-section/yellow-section.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BookingListComponent } from './sections/bookinglist/booking-list/booking-list.component';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    BrandsComponent,
    ServiceComponent,
    HowItWorksComponent,
    HappyClientsComponent,
    YellowSectionComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,CarouselModule,FormsModule
  ],
  providers:[]
})
export class HomeModule { }
