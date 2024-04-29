import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-service-landing',
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.css'],
})
export class ServiceLandingComponent implements OnInit {
  base_url = environment.aws_url;
  packageList: any;

  token:any

  custId:any;

  customerVehicleList: any;

  refreshNumber:any;

  refresh_number:any;

  constructor(
    private router: Router,
    private booking_service: BookingService,
    private auth_service:AuthService,
    private activerouter: ActivatedRoute
  ) {
    
  }


  ngOnInit(): void {

    this.refresh_number = localStorage.getItem('refresh_number')
    this.refreshNumber = this.activerouter.snapshot.paramMap.get('num'); 

    

    this.booking_service.allServicesListedForLandingPage().subscribe((data) => {
      this.packageList = data.data;
      
    });

    this.token = localStorage.getItem('cust_token')
    this.custId = localStorage.getItem('id')

    if(this.token){

      let data = {
        custId: atob(this.custId)
      }

      this.auth_service.customerVehicleList(data).subscribe(data=>{
        this.customerVehicleList = data.vehList
      })
    }

    // if(this.refreshNumber == 1){
    //   this.router.navigateByUrl('/services/0')  
    // }

    

    if(this.refresh_number == 1 ){
      localStorage.setItem('refresh_number',"0" )
      window.location.reload();
    }
  }

  bookNow(package_id: any) {
    this.router.navigateByUrl('booking/' + btoa(package_id));
  }
}
