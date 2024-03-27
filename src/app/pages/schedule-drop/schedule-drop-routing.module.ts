import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleDropPageComponent } from './schedule-drop-page/schedule-drop-page.component';

const routes: Routes = [
  {
    path:'',component:ScheduleDropPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleDropRoutingModule { }
