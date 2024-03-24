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
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    BrandsComponent,
    ServiceComponent,
    HowItWorksComponent,
    HappyClientsComponent,
    YellowSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,CarouselModule
  ],
  providers:[]
})
export class HomeModule { }
