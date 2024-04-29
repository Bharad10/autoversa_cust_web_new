import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.css']
})
export class VerificationPageComponent {
  display: any;
  resendOtp: boolean = false;
  displayTimer: boolean = false;
  otp_timer: any;
  mobileNumber: any;
  urlmobnumber:any;
  country_code: any;
  inputnumberone: any;
  inputnumbertwo: any;
  inputnumberthree: any;
  inputnumberfour: any;
  otpNumber: any;
  resendOtpTime:any;
  constructor(
    private router: Router,private auth_service:AuthService,private activerouter: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.otp_timer = this.activerouter.snapshot.paramMap.get('timer');
    this.mobileNumber = this.activerouter.snapshot.paramMap.get('phone');
    this.urlmobnumber = this.activerouter.snapshot.paramMap.get('phone')
    this.country_code = this.activerouter.snapshot.paramMap.get('country_code');
    this.mobileNumber =  atob(this.mobileNumber);
    this.country_code = atob(this.country_code);
    this.start(Number(atob(this.otp_timer)));
  }

  onOtpChange(event:any){
    this.otpNumber = event    
  }

  start(seconds: number) {
    this.displayTimer = true;
    this.resendOtp = false;
    let textSec: any = '0';
    let statSec = seconds % 60;
    let minute = Math.floor(seconds / 60);
  
    const prefix = minute < 10 ? '0' : '';
  
    const timer = setInterval(() => {
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else {
        textSec = statSec;
      }
  
      this.display = `${prefix}${minute}:${textSec}`;
  
      if (seconds == 0) {
        clearInterval(timer);
        this.resendOtp = true;
        this.displayTimer = false;
      } else {
        seconds--;
        if (statSec != 0) statSec--;
        else {
          statSec = 59;
          minute--;
        }
      }
    }, 1000);
  }

  resendOtpFunction(){
    let data ={
      phone:this.mobileNumber,
      country_code:this.country_code
    }
    this.auth_service.sendsignin_otp(data).subscribe(data =>{
      if(data.ret_data=='success'){
        this.resendOtpTime = Number(data.timer.gs_reotp_time)
        this.start(this.resendOtpTime)
      }
      else if(data.ret_data=='Maximum attempt reached. Please try again later'){
        alert(data.ret_data)
      }
            
    })
  }

  verify(){
    if(this.otpNumber == null || this.otpNumber == '' ){
      this.toast.warning("Please enter OTP")
      return;
    }
    let input_data = {
      phone:this.mobileNumber,
      otp:this.otpNumber,
      country_code:this.country_code
    }
    this.auth_service.verifysignin_otp(input_data).subscribe((rdata: any) => {
      // localStorage.setItem("cust_token", rdata.token )  
      // localStorage.setItem("name", btoa(rdata.customer.name)) 
      // localStorage.setItem("id", btoa(rdata.customer.id))           
      if(rdata.ret_data=="success"){
        if(rdata.customer.cust_type=="old"){
          this.router.navigateByUrl('/services')
          localStorage.setItem("cust_token", rdata.token )  
        localStorage.setItem("name", btoa(rdata.customer.name)) 
        localStorage.setItem("id", btoa(rdata.customer.id)) 
        localStorage.setItem('refresh_number','1')          
        }else if(rdata.customer.cust_type == "new"){
           this.router.navigateByUrl('signup/'+btoa(this.country_code)+'/'+btoa(this.mobileNumber));
           localStorage.setItem("cust_token", rdata.token )  
          localStorage.setItem("name", btoa(rdata.customer.name)) 
          localStorage.setItem("id", btoa(rdata.customer.id))           
        }
        else if(rdata.customer.cust_delete_flag=="1"){
          this.toast.error("Your account has been deactivated")
        }
        else {
          this.toast.error(rdata.message)
        }
        
      }
      else if(rdata.ret_data=='MaxAttempt'){
        this.toast.error("Maximum attempt reached. Please try again later.");
        this.displayTimer=false
      }
      else{
       this.toast.error(rdata.message)
      }
  
  });
    //this.router.navigateByUrl('signup');
  }

  
}
