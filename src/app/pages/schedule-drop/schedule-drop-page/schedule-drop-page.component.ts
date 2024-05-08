import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  booking_id:any;

  currentDropAddressDetails:any;

  currentDropType:any;

  DropTypes: any;

  selectedDropOption:any;

  selectedDropDetails:any;

  data:any;

  intialDropValue:any;

  dropValueAfterAddressCahnge:any;

  dropCost:number= 0;

  selectedDate:any;

  custID:any;

  selectedtimeSlot:any;


  constructor(private booking_service: BookingService, private activerouter: ActivatedRoute, private router:Router){
    this.booking_id = this.activerouter.snapshot.paramMap.get('id');

  }



  ngOnInit(): void {
    this.custID = (localStorage.getItem('id'))
    this.getCustomerAddress()
    this.getPickupOptions()
    this.getBookingDetails()
    this.getBookingDetailsForDateConfirmation()   
  }

  dropCostCalculation(){
    this.selectedDropDetails = this.DropTypes.find((data:any)=>{
      return data.pk_id == this.selectedDropOption 
    })
   let paidAmount = 0;
   let vatTotal =0;
   if(this.selectedDropDetails.pk_freeFlag != 1){
    paidAmount = parseFloat(this.currentDropAddressDetails.cad_distance) * parseFloat(this.selectedDropDetails.pk_cost)
    console.log("paidAmount",paidAmount);
    console.log("cad_distance",this.currentDropAddressDetails.cad_distance);
    console.log("pk_cost",this.selectedDropDetails.pk_cost);
    if(this.data.settings.gs_isvat == 1 ){
      let vat = parseFloat(this.data.settings.gs_vat)
      vatTotal = vat/100
      console.log("Prime vat",vatTotal);
      vatTotal = vatTotal * paidAmount
      console.log("vat",vatTotal);
      paidAmount = paidAmount + vatTotal;
      paidAmount <= this.selectedDropDetails.pk_min_cost ? paidAmount = parseFloat(this.selectedDropDetails.pk_min_cost) : paidAmount = paidAmount;
    } 
   }else{
    paidAmount = 0;
   }
   return paidAmount;
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

  getPickupOptions(){
    this.booking_service.getpickupOptions().subscribe((data:any)=>{
     this.DropTypes = data.active_pickuptype_list; 
     this.data = data 
    })
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
      book_id :this.booking_id,
    }
    this.booking_service.GetbookingdetailsbyId(data).subscribe((data:any) =>{
      this.bookingData = data
      this.dropAddressId = data.booking.drop_address.cad_id
      this.currentDropAddressDetails = data.booking.drop_address
      this.selectedDropOption = data.booking.pickup_type.pk_id;
      this.selectedDropDetails = this.DropTypes.find((data:any)=>{
        return data.pk_id == this.selectedDropOption 
      })
     this.intialDropValue = this.dropCostCalculation(); 
     
    })
    console.log("intialDropValue",this.intialDropValue);
    
  }

  getCustomerAddress(){
    this.booking_service.GetcustomerAddresses({ cust_id: localStorage.getItem('id') }).subscribe((data:any)=>{
      this.custAdresses = data.cust_address
      console.log(this.custAdresses);
    })
    
  }

  selectAddress(){
    this.currentDropAddressDetails = this.custAdresses.find((data:any)=>{
      return data.cad_id == this.dropAddressId;
    })
    console.log("newely sleceted address dets----->",this.currentDropAddressDetails);
    
    this.selectedDropDetails = this.DropTypes.find((data:any)=>{
      return data.pk_id == this.selectedDropOption 
    })

    this.dropValueAfterAddressCahnge = this.dropCostCalculation();

    if( this.dropValueAfterAddressCahnge > this.intialDropValue ) {
      console.log("Enterd Here drpval >");  
      this.dropCost = this.dropValueAfterAddressCahnge - this.intialDropValue
    }
    if(this.dropValueAfterAddressCahnge == this.intialDropValue){
      console.log("Enterd Here drpval == intialval");
      this.dropCost = 0
    }
    if(this.dropValueAfterAddressCahnge < this.intialDropValue){
      console.log("Enterd Here drpval <");
      this.dropCost = 0
    }

  }

  DropOptionSelection(dropDetails:any){
    this.selectedDropDetails = dropDetails
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
    this.selectedDate = `${year}-${month}-${day}`
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

  timeselect(details:any){
    this.selectedtimeSlot = `${details.startTime} - ${details.endTime}`
  }

  noPaymentReschedule(){
    console.log(this.booking_slot);
    
    let data = {
      drop_location_id : this.dropAddressId,
      booking_id : atob(this.booking_id),
      selected_date : this.selectedDate,
      selected_timeid: this.booking_slot,
      selected_timeslot: this.selectedtimeSlot,
      custId : atob(this.custID),
      tot_amount: this.dropValueAfterAddressCahnge ? this.dropValueAfterAddressCahnge : this.intialDropValue,
      trxn_id:1234 
    }

    this.booking_service.cofirmDropLocationWithoutPayment(data).subscribe(data=>{
      console.log(data);
    })

    this.router.navigateByUrl('/booking-status-flow/'+ this.booking_id)

  }

  paymentReschedule(){

  }

}
