import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reschedule-component',
  templateUrl: './reschedule-component.component.html',
  styleUrls: ['./reschedule-component.component.css']
})
export class RescheduleComponentComponent implements OnInit{

  bookingId:any;
  bookingaddress:any;
  numberOfDaysfrmBackend:any;
  minSelectableDate:any;
  maxSelectableDate:any;
  bookingDate:any;
  timeslots:any;
  booking_slot:any;
  formated_bookingdate:any;
  previousBookingDate:any;
  bkVersion:any;
  custStatus:any;

  constructor(private booking_service:BookingService,private activerouter: ActivatedRoute,private router: Router){
    this.bookingId = this.activerouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getBookingdetailsForDisplay()
    this.getBookingDetails()
  }

  getBookingdetailsForDisplay(){
    let data ={
      book_id: (this.bookingId)
    }
    this.booking_service.getBookingDetailsforReschedule(data).subscribe((data:any)=>{
      this.bookingaddress = data.booking.pickup_address.cad_address
      this.previousBookingDate = data.booking.bk_booking_date
      this.bkVersion = data.booking.bk_version
      this.custStatus = data.booking.cust_status.st_code
    })
  }

  getBookingDetails() {
    this.booking_service.getbookingDetails().subscribe((data) => {
      this.numberOfDaysfrmBackend = Number(data.settings.gs_nofdays);
      console.log(
        'The number of Days from Backend: ' + this.numberOfDaysfrmBackend
      );
      this.calculateTheSelectedDates();
    });
  }

  calculateTheSelectedDates() {
    const currentDate = new Date();
    this.minSelectableDate = currentDate;
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + this.numberOfDaysfrmBackend);
    this.maxSelectableDate = maxDate;
    console.log(
      'The selected dates',
      this.minSelectableDate,
      this.maxSelectableDate
    );
  }

  ondateSelection() {
    this.booking_slot = '';
    this.timeslots = [];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[this.bookingDate.getDay()]; // This will return "Saturday"
    const day = ('0' + this.bookingDate.getDate()).slice(-2);
    const month = ('0' + (this.bookingDate.getMonth() + 1)).slice(-2);
    const year = this.bookingDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    this.formated_bookingdate = formattedDate
    let inputData = {
      day: dayName,
      date: formattedDate,
      branch_id:1
    };
    this.booking_service
      .gettimeslotsbyDate(inputData)
      .subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          const currentTime = new Date();
          let bufferTime = parseInt(rdata.settings.gs_bookingbuffer_time);

          console.log('Buffer Time: ' + bufferTime);

          // Create a new Date object for the buffer time
          const bufferDate = new Date(currentTime);
          bufferDate.setMinutes(bufferDate.getMinutes() + bufferTime);

          console.log(
            'Before buffer time addition: ' + currentTime.getMinutes()
          );

          console.log('After buffer time addition: ' + bufferDate.getMinutes());

          // Continue with your logic using the updated date

          rdata.time_slots.forEach((data: any, index: any) => {
            let time = data.tm_start_time;
            const [hoursStr, minutesStr] = time.split(':');
            const targetHours = parseInt(hoursStr);
            const targetMinutes = parseInt(minutesStr);

            // Convert target time to minutes since midnight for comparison
            const targetTimeInMinutes = targetHours * 60 + targetMinutes;

            // Convert buffer time to minutes since midnight for comparison
            const bufferTimeInMinutes =
              bufferDate.getHours() * 60 + bufferDate.getMinutes();

            // Compare the target time with the buffer time
            if (targetTimeInMinutes > bufferTimeInMinutes) {
              let startTime = data.tm_start_time;
              let endTime = data.tm_end_time;

              // Convert start time to 12-hour format
              let startDate = new Date('2000-01-01 ' + startTime);
              let startTime12hr = startDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

              // Convert end time to 12-hour format
              let endDate = new Date('2000-01-01 ' + endTime);
              let endTime12hr = endDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

              let driversAlredayAssigned = rdata.assigned_emp.filter((item:any)=>{
                return data.tm_id == item.tem_slotid
              })

              let timeData 

              if (driversAlredayAssigned.length >= Number(data.driver_count)){
                timeData = { tm_start_time: startTime12hr, tm_end_time: endTime12hr, tm_id:data.tm_id , isTimeSlotFilled:true };
              }else{
                timeData = { tm_start_time: startTime12hr, tm_end_time: endTime12hr, tm_id:data.tm_id , isTimeSlotFilled:false };
              }

              this.timeslots.push(timeData);
            }
          });

         console.log(this.timeslots);
          
        }
      });
  }

  bookingReschedule(){
    let data = {
      bookid:atob(this.bookingId),
      bookingdate:this.formated_bookingdate,
      slot:this.booking_slot,
      scheduletype: this.custStatus == "BKCC"||"HOLDC" ? 5 : 4,
      prebookingdate:this.previousBookingDate,
      booking_version:this.bkVersion
    }
   this.booking_service.bookingReschedule(data).subscribe((data:any)=>{
      if(data.ret_data=="success"){
        this.router.navigateByUrl('');
      }
    console.log(data);
   }) 
  }
}
