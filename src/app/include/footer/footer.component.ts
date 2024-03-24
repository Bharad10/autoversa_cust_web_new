import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  serviceData:any;
  constructor( private booking_service : BookingService ) {

  }

  ngOnInit(): void {
    this.booking_service.allServicesListedForLandingPage().subscribe(data=>{
      this.serviceData = data.data;
    })
  }

}
