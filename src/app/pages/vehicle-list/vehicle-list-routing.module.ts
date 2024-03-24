import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListPageComponent } from './vehicle-list-page/vehicle-list-page.component';

const routes: Routes = [
  {
    path:'', component:VehicleListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleListRoutingModule { }
