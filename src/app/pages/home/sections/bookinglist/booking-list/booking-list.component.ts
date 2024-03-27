import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  //user Id
  userId: any;

  // Booking List
  bookingList: any;
  serviceData:any;
  imageurl: any = "assets/images/sample.jpg";
  base_url = environment.aws_url;
  
  constructor( private authService: AuthService,private booking_service : BookingService, private router: Router ) {

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.fetchBookingList();
    this.booking_service.allServicesListedForLandingPage().subscribe(rdata=>{
      if (rdata.ret_data == "success") {
        this.serviceData = rdata.data;
        console.log("hi======>", this.serviceData);
      }
    })
  }

  fetchBookingList() {
    let data = {
      custId: atob(this.userId)
    };
    this.authService.getBookingList(data).subscribe((data) => {
      this.bookingList = data.book_list
        .filter((booking: any) => booking.st_code !== "CANC" && booking.st_code !== "DLCC")
        .map((booking: any) => {
          const bookingDate = new Date(booking.bk_booking_date);
          const formattedDate = bookingDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          const startTime = new Date(`1970-01-01T${booking.tm_start_time}`);
          const endTime = new Date(`1970-01-01T${booking.tm_end_time}`);
          const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          return {
            ...booking,
            formattedDate,
            formattedStartTime,
            formattedEndTime
          };
        });
    });
  }
  
  bookNow(package_id: any) {
    this.router.navigateByUrl('booking/' + btoa(package_id));
  }
  navigateBookingDetails(book_id: any){
    this.router.navigateByUrl('booking-status-flow/' + btoa(book_id));
  }
}