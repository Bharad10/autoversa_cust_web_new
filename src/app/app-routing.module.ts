import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page/notfound-page.component';



const routes: Routes = [
  {
    path:'',loadChildren:()=>import('../app/pages/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'services',loadChildren:()=>import('../app/pages/service/service.module').then(m=>m.ServiceModule)
  },
  {
    path:'booking/:id',loadChildren:()=>import('../app/pages/booking/booking.module').then(m=>m.BookingModule)
  },
  {
    path:'offers',loadChildren:()=>import('../app/pages/offers/offers.module').then(m=>m.OffersModule)
  },
  {
    path:'faq',loadChildren:()=>import('../app/pages/FAQ/faq.module').then(m=>m.FAQModule)
  },
  {
    path:'blog',loadChildren:()=>import('../app/pages/blog/blog.module').then(m=>m.BlogModule)
  },
  {
    path:'blog-details',loadChildren:()=>import('../app/pages/blog-details/blog-details.module').then(m=>m.BlogDetailsModule)
  },
  {
    path:'login/:number',loadChildren:()=>import('../app/pages/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'verification/:country_code/:phone/:timer',loadChildren:()=>import('../app/pages/verification/verification.module').then(m=>m.VerificationModule)
  },
  {
    path:'signup/:country_code/:phone',loadChildren:()=>import('../app/pages/signup/signup.module').then(m=>m.SignupModule)
  },
  {
    path:'profile',loadChildren:()=>import('../app/pages/profile/profile.module').then(m=>m.ProfileModule)
  },
  {
    path:'contact',loadChildren:()=>import('../app/pages/contact/contact.module').then(m=>m.ContactModule)
  },
  {
    path:'team',loadChildren:()=>import('../app/pages/team/team.module').then(m=>m.TeamModule)
  },
  {
    path:'about',loadChildren:()=>import('../app/pages/about/about.module').then(m=>m.AboutModule)
  },
  {
    path:'booking-status-flow/:id',loadChildren:()=>import('../app/pages/booking-status-flow/booking-status-flow.module').then(m=>m.BookingStatusFlowModule)
  },
  {
    path:'vehiclelist',loadChildren:()=>import('../app/pages/vehicle-list/vehicle-list.module').then(m=>m.VehicleListModule)
  },
  {
    path:'vehicleScheduleDrop',loadChildren:()=>import('../app/pages/schedule-drop/schedule-drop.module').then(m=>m.ScheduleDropModule)
  },
  {
    path:'**',component:NotfoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
