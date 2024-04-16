import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  vehicleList: any;
  // ServicePackage: any;
  customerId: any;
  serviceData: any;
  selectedCar: any;
  selectedService: any;
  custBookingList: any;
  mobileNumber:any;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private booking_service: BookingService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService
  ) {
    this.selectedCar = 0;
    this.selectedService = 0;
  }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('id');
    this.fetchCarModels();
    this.getCustomerBookings();
  }

  getCustomerBookings() {
    let data = {
      custId: atob(this.customerId),
    };
    this.booking_service.getCustomerBookings(data).subscribe((data) => {
      this.custBookingList = data.book_list;
    });
  }
  fetchCarModels() {
    let inData = {
      custId: atob(this.customerId),
    };
    this.authService.customerVehicleList(inData).subscribe((fetched_data) => {
      this.vehicleList = fetched_data.vehList;
      console.log(this.vehicleList);
    });
    this.booking_service
      .allServicesListedForLandingPage()
      .subscribe((rdata) => {
        if (rdata.ret_data == 'success') {
          this.serviceData = rdata.data;
          console.log('hi======>', this.serviceData);
        }
      });
  }

  bookingNavigate() {
    if(this.selectedCar == 0 || this.selectedService == 0){
      this.toast.warning("Select Value to proceed with the booking")
      return;
    }
    if (this.selectedCar) {
      let filterdArray = this.custBookingList.filter((data: any) => {
        return this.selectedCar == data.bk_vehicle_id;
      });

      if(filterdArray>0){
        if(filterdArray[0].custstatus != 'Delivery Completed' && filterdArray[0].custstatus != 'Booking Canceled'){
        this.toast.error('Booking already exists');
        // this.bookingSectionDisplay = false
        return;
        }
        return;
      }
      else{
        this.router.navigateByUrl('booking/' + btoa(this.selectedService));
      }   
    }
  }

  vehicleIdChanging(event: any) {
    this.data.setData(this.selectedCar);
  }

  signin() {
    if(this.mobileNumber <= 10){
      return;
    }
    this.loading = true;
    this.authService.sendsignin_otp({ phone: this.mobileNumber, country_code: "+91" }).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.router.navigateByUrl('verification/' + btoa('+91') + '/' + btoa(this.mobileNumber) + '/' + btoa(rdata.timer.gs_reotp_time));
      } else {
        this.loading = false; 
      }
      this.loading = false; 
    });
  }
}
