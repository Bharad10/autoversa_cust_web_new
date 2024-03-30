import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RescheduleComponentComponent } from './reschedule-component/reschedule-component.component';

const routes: Routes = [
  {
    path:'',component: RescheduleComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescheduleRoutingModule { }
