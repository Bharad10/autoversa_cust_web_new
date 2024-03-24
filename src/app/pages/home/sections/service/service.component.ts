import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  serviceData:any;
  imageurl: any = "assets/images/sample.jpg";
  base_url = environment.aws_url;
  
  constructor( private booking_service : BookingService, private router: Router ) {

  }

  ngOnInit(): void {
    this.booking_service.allServicesListedForLandingPage().subscribe(rdata=>{
      if (rdata.ret_data == "success") {
        this.serviceData = rdata.data;
        console.log("hi======>", this.serviceData);
      }
    })
  }
  
  bookNow(package_id: any) {
    this.router.navigateByUrl('booking/' + btoa(package_id));
  }
}
