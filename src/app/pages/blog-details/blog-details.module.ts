import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';


@NgModule({
  declarations: [
    BlogDetailsPageComponent
  ],
  imports: [
    CommonModule,
    BlogDetailsRoutingModule
  ]
})
export class BlogDetailsModule { }
