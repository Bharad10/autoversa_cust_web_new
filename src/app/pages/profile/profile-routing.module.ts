import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { AddressPageComponent } from './address-page/address-page.component';

const routes: Routes = [
  {
    path:'',component:ProfilePageComponent
  },
  {
    path:'address', component:AddressPageComponent
  },
  {
    path:'services', component:ServicesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
