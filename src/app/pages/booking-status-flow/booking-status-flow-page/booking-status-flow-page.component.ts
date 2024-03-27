import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-status-flow-page',
  templateUrl: './booking-status-flow-page.component.html',
  styleUrls: ['./booking-status-flow-page.component.css']
})
export class BookingStatusFlowPageComponent {
  
  booking_id:any;
  booking_details:any;
  customerId:any;
  bgColor1: string = '';
  bgColor2: string = '';
  statusFlow: any[] = [];
  activeBookings: any[] = [];
  Booking_payments: any[] = [];
  selectAll=false;
  selected_jobs:any[] = [];
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
  workcard_showFlag=0;
  position:any;
  booing_jobs: any[]=[];
  constructor(
    private router: Router,private activerouter: ActivatedRoute,private booking_service:BookingService
  ) {
    
    this.booking_id = this.activerouter.snapshot.paramMap.get('id');
    this.customerId = localStorage.getItem('id');
    let input_data = {
      book_id:this.booking_id
    }
    this.booking_service.GetbookingdetailsbyId(input_data).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.position= this.cust_status_master.indexOf(rdata.booking.cust_status.st_code);
        this.booking_details = rdata.booking;
        console.log("rdata.booking details--->",rdata.booking);
        console.log("bookin details--->",this.booking_details.bk_consumcost);
        const created_date: Date = new Date(this.booking_details.bk_created_on);
        const day: number = created_date.getDate();
        const month: number = created_date.getMonth() + 1;
        const year: number = created_date.getFullYear();
        const formatted_date: string = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`;
        this.booking_details.bk_created_on = formatted_date;
       rdata.booking.status_flow.forEach((element: {
        bkt_created_on: string | number | Date; bkt_code: string; bkt_task: string; 
        }) => {
        let stdata:any ;
        if(element.bkt_code=="BKCC" && element.bkt_task!="Unhold"){

           stdata = {
            "status": "Booking created",
            "code": element.bkt_code,
            "icon": './assets/images/booking_icon.png',
            "dateandtime":formatted_date
          }
        }else if(element.bkt_code=="DRPC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Driver en route to location",
            "code": element.bkt_code,
            "icon": './assets/images/driver_enroute_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="PIPC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Pick up in progress",
            "code": element.bkt_code,
            "icon": './assets/images/pickup_process_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="PIWC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Picked up & en route to workshop",
            "code": element.bkt_code,
            "icon": './assets/images/pickup_enroute_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="VAWC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Vehicle at workshop",
            "code": element.bkt_code,
            "icon": './assets/images/vehicle_wrkshp_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="WIPC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Work in progress",
            "code": element.bkt_code,
            "icon": './assets/images/work_in_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="CDLC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Ready for delivery",
            "code": element.bkt_code,
            "icon": './assets/images/ready_delivery_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="RFDC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Delivery scheduled on",
            "code": element.bkt_code,
            "icon": './assets/images/drop_enrouted.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="DEDC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Booking created",
            "code": element.bkt_code,
            "icon": './assets/images/booking_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }else if(element.bkt_code=="DLCC" && element.bkt_task!="Unhold"){
          const created_date: Date = new Date(element.bkt_created_on);
          const day: number = created_date.getDate();
          const month: number = created_date.getMonth() + 1;
          const year: number = created_date.getFullYear();
          stdata = {
            "status": "Delivery completed",
            "code": element.bkt_code,
            "icon": './assets/images/delivery_icon.png',
            "dateandtime":`${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}, ${created_date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}`
          }
        }
        if(this.statusFlow.length>0){
          let filterdstatusData = this.statusFlow.filter((data) => (data = data.code == stdata.code));
          
          filterdstatusData.length>0?"":this.statusFlow.push(stdata);
        }else{
          stdata?this.statusFlow.push(stdata):"";
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
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "PIPC") {
          temp = {
            "status": "Pick up in progress",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/pickup_icon_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "PIWC") {
          temp = {
            "status": "Picked up & en route\nto workshop",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/pickup_enroute_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "VAWC") {
          temp = {
            "status": "Vehicle @ Workshop",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/vehicle_wrkshp_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "WIPC") {
          temp = {
            "status": "Work In Progress",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/work_in_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "CDLC") {
          temp = {
            "status": "Ready for Delivery",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/ready_delivery_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "RFDC") {
          temp = {
            "status": "Location Confirmed",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/confirm_drop_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "DEDC") {
          temp = {
            "status": "Driver en route\nto drop location",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/drop_enrouted_inactive.png'
          };
          this.statusFlow[i]=temp;
        }
        if (this.cust_status_master[i] == "DLCC") {
          temp = {
            "status": "Delivery Completed",
            "dateandtime": "",
            "code": "",
            "icon": './assets/images/delivery_inactive.png'
          };
        }
        temp?this.statusFlow[i]=temp:"";
      }
      }
      console.log("st ssssss----->",this.statusFlow);

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
  getCustomerBookings(){
    this.booking_service.GetCustomerbookings({custId:atob(this.customerId)}).subscribe((rdata: any) => {
      if(rdata.ret_data=="success"){
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
  onWorkcardSelection(card_flag:any){
    this.workcard_showFlag=card_flag;
    let input_data = {
      bookid:atob(this.booking_id)
    }
    this.booking_service.GetBookingJobDetails(input_data).subscribe((rdata: any) => {
      if(rdata.ret_data=="success"){
        this.booking_details = rdata.booking;
        this.booking_details.bk_consumcost = parseFloat(this.booking_details.bk_consumcost)+parseFloat(this.booking_details.bk_consumvat);
        this.booing_jobs =rdata.jobs;
        this.Booking_payments = rdata.payments;
       this.calculateTotal();
      }
    });
  }
  calculateTotal() {
    console.log("jjjjjiiiiiii-----k-->");
    this.booking_details.total_cost = 0.0;
    this.booking_details.grand_total = 0.0;
    this.booking_details.paid_total = 0.0;
    if (parseFloat(this.booking_details.booking_package.bkp_cust_amount ) > 0) {
      this.booking_details.total_cost = Math.round(this.booking_details.total_cost + parseFloat(this.booking_details.booking_package.bkp_cust_amount)+parseFloat(this.booking_details.booking_package.bkp_vat));
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
    console.log("grand total---->",this.booking_details.grand_total);

  }
  Selectalljobs() {
    console.log("----------------selectAll-----",this.selectAll)
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
        console.error("Booking jobs data is not an array or does not exist");
      }
      console.log("----------------jjj",this.selected_jobs)
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
      console.error("Booking jobs data is not an array or does not exist");
    } 
  }
  }
  jobsel(iselected:any, job:any) {

    if (!iselected) {
        this.selected_jobs.push(job);
    } else {
      const index2 = this.selected_jobs.findIndex((x) => x.bkj_id === job.bkj_id);
      this.selected_jobs.splice(index2, 1);
    }

  }
  approveSelectedJobs(){

  }
}
