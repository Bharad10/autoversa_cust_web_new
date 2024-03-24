import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceLandingComponent } from './service-landing/service-landing.component';

const routes: Routes = [
  {
    path:'',component:ServiceLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
