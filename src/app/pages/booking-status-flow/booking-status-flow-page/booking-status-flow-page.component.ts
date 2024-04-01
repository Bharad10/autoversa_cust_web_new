import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-booking-status-flow-page',
  templateUrl: './booking-status-flow-page.component.html',
  styleUrls: ['./booking-status-flow-page.component.css']
})
export class BookingStatusFlowPageComponent {

  booking_id: any;
  booking_details: any;
  customerId: any;
  bgColor1: string = '';
  bgColor2: string = '';
  statusFlow: any[] = [];
  activeBookings: any[] = [];
  Booking_payments: any[] = [];
  selectAll=false;
  selected_jobs:any[] = [];
  pendingJobs_flag =false;
  cancelReason:any;
  holdReason:any;
  timeslots:any[]=[];
  booking_slot: any;
  inspectionDetails:any;
  cust_status_master = [
    'BKCC',
    'DRPC',
    'PIPC',
    'PIWC',
    'VAWC',
    'WIPC',
    'CDLC',
    'RFDC',
    'DEDC',
    'DLCC',
    'BAPC',
    'HOLDC',
  ];
  workcard_showFlag = 0;
  position: any;
  booing_jobs: any[] = [];
  bookingDate:any;
  minSelectableDate: any;
  maxSelectableDate: any;
  base_url = environment.aws_url;
  constructor(
    private router: Router, private activerouter: ActivatedRoute, private booking_service: BookingService
  ) {

    this.booking_id = this.activerouter.snapshot.paramMap.get('id');
    this.customerId = localStorage.getItem('id');
    let input_data = {
      book_id: this.booking_id
    }
    this.booking_service.GetbookingdetailsbyId(input_data).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.position = this.cust_status_master.indexOf(rdata.booking.cust_status.st_code);
        this.booking_details = rdata.booking;
        console.log("rdata.booking details--->", rdata.booking);
        console.log("bookin details--->", this.booking_details.bk_consumcost);
        const created_date: Date = new Date(this.booking_details.bk_created_on);
        const day: number = created_date.getDate();
        const month: number = created_date.getMonth() + 1;
        const year: number = created_date.getFullYear();
        const formatted_date: string = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`;
        this.booking_details.bk_created_on = formatted_date;
        rdata.booking.status_flow.forEach((element: {
          bkt_created_on: string | number | Date; bkt_code: string; bkt_task: string;
        }) => {
          let stdata: any;
          if (element.bkt_code == "BKCC" && element.bkt_task != "Unhold") {

            stdata = {
              "status": "Booking created",
              "code": element.bkt_code,
              "icon": './assets/images/booking_icon.png',
              "dateandtime": formatted_date
            }
          } else if (element.bkt_code == "DRPC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Driver en route to location",
              "code": element.bkt_code,
              "icon": './assets/images/driver_enroute_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "PIPC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Pick up in progress",
              "code": element.bkt_code,
              "icon": './assets/images/pickup_process_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "PIWC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Picked up & en route to workshop",
              "code": element.bkt_code,
              "icon": './assets/images/pickup_enroute_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "VAWC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Vehicle at workshop",
              "code": element.bkt_code,
              "icon": './assets/images/vehicle_wrkshp_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "WIPC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Work in progress",
              "code": element.bkt_code,
              "icon": './assets/images/work_in_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "CDLC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Ready for delivery",
              "code": element.bkt_code,
              "icon": './assets/images/ready_delivery_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "RFDC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Delivery scheduled on",
              "code": element.bkt_code,
              "icon": './assets/images/drop_enrouted.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "DEDC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Booking created",
              "code": element.bkt_code,
              "icon": './assets/images/booking_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          } else if (element.bkt_code == "DLCC" && element.bkt_task != "Unhold") {
            const created_date: Date = new Date(element.bkt_created_on);
            const day: number = created_date.getDate();
            const month: number = created_date.getMonth() + 1;
            const year: number = created_date.getFullYear();
            stdata = {
              "status": "Delivery completed",
              "code": element.bkt_code,
              "icon": './assets/images/delivery_icon.png',
              "dateandtime": `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`
            }
          }
          if (this.statusFlow.length > 0) {
            let filterdstatusData = this.statusFlow.filter((data) => (data = data.code == stdata.code));

            filterdstatusData.length > 0 ? "" : this.statusFlow.push(stdata);
          } else {
            stdata ? this.statusFlow.push(stdata) : "";
          }
        });
        for (let i = (this.position + 1); i < this.cust_status_master.length; i++) {
          let temp;
          if (this.cust_status_master[i] == "DRPC") {
            temp = {
              "status": "Driver en route\nto pickup location",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/driver_enrouted_inactive.png',
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "PIPC") {
            temp = {
              "status": "Pick up in progress",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/pickup_icon_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "PIWC") {
            temp = {
              "status": "Picked up & en route\nto workshop",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/pickup_enroute_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "VAWC") {
            temp = {
              "status": "Vehicle @ Workshop",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/vehicle_wrkshp_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "WIPC") {
            temp = {
              "status": "Work In Progress",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/work_in_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "CDLC") {
            temp = {
              "status": "Ready for Delivery",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/ready_delivery_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "RFDC") {
            temp = {
              "status": "Location Confirmed",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/confirm_drop_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "DEDC") {
            temp = {
              "status": "Driver en route\nto drop location",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/drop_enrouted_inactive.png'
            };
            this.statusFlow[i] = temp;
          }
          if (this.cust_status_master[i] == "DLCC") {
            temp = {
              "status": "Delivery Completed",
              "dateandtime": "",
              "code": "",
              "icon": './assets/images/delivery_inactive.png'
            };
          }
          temp ? this.statusFlow[i] = temp : "";
        }
      }
      console.log("st ssssss----->", this.statusFlow);

    });
    this.getCustomerBookings();
  }
  changeBackgroundColor(sectionNumber: number) {
    if (sectionNumber === 1) {
      this.bgColor1 = '#e1e1e1';
      this.bgColor2 = '';
    } else if (sectionNumber === 2) {
      this.bgColor1 = '';
      this.bgColor2 = '#e1e1e1';
    }
  }
  getCustomerBookings() {
    this.booking_service.GetCustomerbookings({ custId: atob(this.customerId) }).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        rdata.book_list.forEach((element: any) => {
          if(element.bk_id==this.booking_details.bk_id) element.bgColor = '#e1e1e1';
          else element.bgColor = '';
        });
        this.activeBookings = rdata.book_list;
      }
    });
  }
  formatTime(time: string): string {
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const timeObject = new Date();
    timeObject.setHours(hours, minutes);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  onWorkcardSelection(card_flag: any) {
    this.workcard_showFlag = card_flag;
    if(card_flag==1){
      let input_data = {
      bookid: atob(this.booking_id)
    }
    this.booking_service.GetBookingJobDetails(input_data).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.booking_details = rdata.booking;
        this.booking_details.bk_consumcost = parseFloat(this.booking_details.bk_consumcost)+parseFloat(this.booking_details.bk_consumvat);
        rdata.jobs.forEach((element: { status: any; bkj_status: any; job_id: any; bkj_id: any; }) => {
          element.status = element.bkj_status;
          element.job_id = element.bkj_id;
          if(element.bkj_status==1){
            this.pendingJobs_flag = true;
          }
        });
        this.booing_jobs =rdata.jobs;
        this.Booking_payments = rdata.payments;
        this.calculateTotal();
      }
    });
  }else if(card_flag==2){
    let input_data = {
      bookid: atob(this.booking_id),
      type: 1
    }
    this.booking_service.GetBookingInspectionDetails(input_data).subscribe((rdata: any) => {
      if(rdata.ret_data=="success"){
        this.inspectionDetails = rdata.inspection;
        this.inspectionDetails.media = rdata.medias;
        this.inspectionDetails.media = this.inspectionDetails.media.map((item: any) => ({ ...item, cssStyle: 'scale(1)' }));
if (rdata.pickup_odometers && rdata.pickup_odometers.length > 0) {
  const filteredData = rdata.pickup_odometers.filter((item: { bkt_code: string; }) => item.bkt_code === "PIWC");
  if (filteredData.length > 0) {
      this.inspectionDetails.pickup_odometer = filteredData[0].bkt_url;
  }
}


      }
    });
  }
  }
  calculateTotal() {
    console.log("jjjjjiiiiiii-----k-->");
    this.booking_details.total_cost = 0.0;
    this.booking_details.grand_total = 0.0;
    this.booking_details.paid_total = 0.0;
    if (parseFloat(this.booking_details.booking_package.bkp_cust_amount) > 0) {
      this.booking_details.total_cost = Math.round(this.booking_details.total_cost + parseFloat(this.booking_details.booking_package.bkp_cust_amount) + parseFloat(this.booking_details.booking_package.bkp_vat));
    }
    this.booing_jobs.forEach((element) => {
      let eachjobcost = 0.00;
      element.bkj_vat = 0.00;
      if (
        parseFloat(element.bkj_cust_cost) > 0 &&
        (element.bkj_status == "2" || element.bkj_status == "4")
      ) {
        this.booking_details.total_cost = this.booking_details.total_cost + parseFloat(element.bkj_cust_cost);
      }

    });
    this.booking_details.grand_total = parseFloat(
      (this.booking_details.total_cost + parseFloat(this.booking_details.bk_pickup_cost)).toFixed(2)
    );

    if (this.booking_details.bk_consumcost != 0.00) {
      this.booking_details.total_cost = this.booking_details.total_cost + parseFloat(this.booking_details.bk_consumcost);


    }
    this.Booking_payments.forEach((element) => {
      if (parseFloat(element.bpt_amount) > 0) {
        this.booking_details.paid_total = this.booking_details.paid_total + parseFloat(element.bpt_amount);
      }

    });
    this.booking_details.grand_total = this.booking_details.total_cost - parseFloat(this.booking_details.bk_discount);
    this.booking_details.grand_total = (this.booking_details.grand_total - parseFloat(this.booking_details.bk_coupondiscount));
    console.log("grand total---->", this.booking_details.grand_total);

  }
  Selectalljobs() {
    if (!this.selectAll) {
      this.selected_jobs = [];
      const bookingJobs = this.booing_jobs;

      if (Array.isArray(bookingJobs)) {
        const updatedBookingJobs = bookingJobs.map((job: any) => {
          return { ...job, iselected: true };
        });
        
        this.selected_jobs = bookingJobs;
        this.booing_jobs = updatedBookingJobs;
      } else {
      }
  }else{
    this.selected_jobs = [];
    const bookingJobs = this.booing_jobs;

    if (Array.isArray(bookingJobs)) {
      const updatedBookingJobs = bookingJobs.map((job: any) => {
        return { ...job, iselected: false };
      });
      
      
      this.selected_jobs = [];
      this.booing_jobs = updatedBookingJobs;
    } else {
      this.selected_jobs = [];
      const bookingJobs = this.booing_jobs;

      if (Array.isArray(bookingJobs)) {
        const updatedBookingJobs = bookingJobs.map((job: any) => {
          return { ...job, iselected: false };
        });


        this.selected_jobs = [];
        this.booing_jobs = updatedBookingJobs;
      } else {
        console.error("Booking jobs data is not an array or does not exist");
      }
    }
  }
}
  jobsel(iselected: any, job: any) {

    if (!iselected) {
      this.selected_jobs.push(job);
    } else {
      const index2 = this.selected_jobs.findIndex((x) => x.bkj_id === job.bkj_id);
      this.selected_jobs.splice(index2, 1);
    }

  }
  approveSelectedJobs(flag:any){
    if(flag==0){
      this.selected_jobs.forEach(element => {
        element.status=2;
        element.job_accepted_cost = element.bkj_cust_cost;
      });
    }else{
      this.selected_jobs.forEach(element => {
        element.status=3;
      });
    }
    let input_data ={
      'selectedjobs': this.selected_jobs,
      'bookid': this.booking_details.bk_id,
      "booking_version": this.booking_details.bk_version
    }
    this.booking_service.JobstatusChange(input_data).subscribe((rdata: any) => {
      if(rdata.ret_data=="success"){
        this.onWorkcardSelection(1);
      }
    });

  }
  closeaddModal() {
    const modelDiv = document.getElementById('cancelModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  openaddModal() {
    const modelDiv = document.getElementById('cancelModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  closeholdModal() {
    const modelDiv = document.getElementById('holdModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  openholdModal() {
    const modelDiv = document.getElementById('holdModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
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

  changeBookingstatus(changeFlag:any){
    let input_data;
    if(changeFlag==0){
       input_data ={
        "bookid": this.booking_details.bk_id,
        "reason": this.cancelReason,
        "type": "CANCEL",
        "backendstatus": "CANB",
        "customerstatus":"CANC",
        "current_bstatus":"Booking Created",
        "current_cstatus":"Booking Created",
        "user_type": "0",
        "booking_version": this.booking_details.bk_version
      }
    }else if(changeFlag==1){
      input_data ={
        "bookid": this.booking_details.bk_id,
        "reason": this.holdReason,
        "type": "HOLD",
        "backendstatus": "HOLDB",
        "customerstatus":"HOLDC",
        "current_bstatus":"Booking Created",
        "current_cstatus":"Booking Created",
        "user_type": "0",
        "booking_version": this.booking_details.bk_version
      }
    }else if(changeFlag==2){
      input_data ={
        // "bookid": this.booking_details.bk_id,
        // "bookingdate": this.bookingDate,
        // "slot": selected_timeid,
        // "scheduletype": widget.scheduletype,
        // "prebookingdate": bookeddate,
        // "booking_version": booking['bk_version']
      }
    }
    if(changeFlag==0 || changeFlag==1){
      this.booking_service.bookingHoldStatusChange(input_data).subscribe((rdata: any) => {
        if(rdata.ret_data=="success"){
          this.onWorkcardSelection(0);
        }
      });
    }else if(changeFlag==2){
      this.booking_service.bookingReschedule(input_data).subscribe((rdata: any) => {
        if(rdata.ret_data=="success"){
          this.onWorkcardSelection(1);
        }
      });
    }
    
  }
  navigate(){
    this.router.navigateByUrl('rescheduleOrder/'+ btoa(this.booking_details.bk_id))
  }

}
