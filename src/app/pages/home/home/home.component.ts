import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //user Id
  userId: any;

  // Booking List
  bookingList: any;

  refresh_number:any;

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.refresh_number = localStorage.getItem('refresh_number')
    this.userId = localStorage.getItem('id');
    this.fetchBookingList();
    //location.reload();
    if(this.refresh_number == 1){
      localStorage.clear();
      window.location.reload();
    }
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
}
