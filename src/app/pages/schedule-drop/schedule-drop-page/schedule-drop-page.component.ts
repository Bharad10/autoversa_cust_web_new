import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-schedule-drop-page',
  templateUrl: './schedule-drop-page.component.html',
  styleUrls: ['./schedule-drop-page.component.css']
})
export class ScheduleDropPageComponent implements OnInit {
  position: any = { lat: 24.453884, lng: 54.3773438 };
  bookingData: any;

  dropAddressId:any;
  custAdresses:any;

  minSelectableDate:any;
  maxSelectableDate:any;

  bookingDate:any;

  numberOfDaysfrmBackend:any;

  timeslots:any;

  booking_slot:any;

  constructor(private booking_service: BookingService){

  }
  ngOnInit(): void {
    this.getBookingDetails()
    this.getCustomerAddress()
    this.getBookingDetailsForDateConfirmation()
  }

  getBookingDetailsForDateConfirmation() {
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

  getBookingDetails(){
    let data = {
      book_id :btoa("7"),
    }
    this.booking_service.GetbookingdetailsbyId(data).subscribe((data:any) =>{
      this.bookingData = data
      this.dropAddressId = data.booking.drop_address.cad_id
    })
  }

  getCustomerAddress(){
    this.booking_service.GetcustomerAddresses({ cust_id: localStorage.getItem('id') }).subscribe((data:any)=>{
      this.custAdresses = data.cust_address
    })
    
  }

  selectAddress(event:any){
    
  }

  ondateSelection() {
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

    const formattedDate = `${day}-${month}-${year}`;
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
                timeData = { startTime: startTime12hr, endTime: endTime12hr, tm_id:data.tm_id , isTimeSlotFilled:true };
              }else{
                timeData = { startTime: startTime12hr, endTime: endTime12hr, tm_id:data.tm_id , isTimeSlotFilled:false };
              }

              this.timeslots.push(timeData);
            }
          });

         console.log(this.timeslots);
          
        }
      });
  }

}
