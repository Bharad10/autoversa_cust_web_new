import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page-page',
  templateUrl: './login-page-page.component.html',
  styleUrls: ['./login-page-page.component.css']
})
export class LoginPagePageComponent implements OnInit {
  auth_phone = "";
  mobileNumber: any;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService, private router: Router, private fb: FormBuilder, private auth_service: AuthService, private activeroute: ActivatedRoute
  ) {
    this.mobileNumber = this.activeroute.snapshot.paramMap.get('number');
    this.mobileNumber = Number(atob(this.mobileNumber))
    console.log(typeof (this.mobileNumber));
    this.auth_phone = this.mobileNumber;
  }

  ngOnInit(): void {

  }

  signin() {
    this.loading = true;
    if(this.mobileNumber==null){
      this.toastr.error('Please enter mobile number')
      this.loading = false;
      return
    }
    if(this.mobileNumber.length == 10){
      this.toastr.error('Please enter a valid mobile number')
      this.loading = false;
      return
    }
    this.auth_service.sendsignin_otp({ phone: this.auth_phone, country_code: "+91" }).subscribe((rdata: any) => {
      if (rdata.ret_data == "success") {
        this.router.navigateByUrl('verification/' + btoa('+91') + '/' + btoa(this.auth_phone) + '/' + btoa(rdata.timer.gs_reotp_time));
      } else {
        this.loading = false; 
      }
      this.loading = false; 
    });
  }
}
