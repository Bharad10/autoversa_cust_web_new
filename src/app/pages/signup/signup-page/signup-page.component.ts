import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  mobileNumber: any;
  emiratesList: any;
  emiratesId = 'Select Emirate';
  cust_name: any;
  cust_email: any;
  country_code: any;
  cust_token:any;
  loadFlag:boolean = false;
  constructor(
    private router: Router,
    private auth_service: AuthService,
    private activerouter: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.country_code = this.activerouter.snapshot.paramMap.get('country_code');
    this.mobileNumber = this.activerouter.snapshot.paramMap.get('phone');
    this.mobileNumber = atob(this.mobileNumber);
    this.country_code = atob(this.country_code);

    let countryId = { countryId: '1' };
    this.auth_service
      .customer_emirates_list(countryId)
      .subscribe((rdata: any) => {
        if (rdata.ret_data == 'success') {
          this.emiratesList = rdata.statelist;
          //this.emiratesList = [true, 'Two', 3];
          console.log('emirates list-------->', this.emiratesList);
        }
      });
  }
  ngOnInit(): void {
    this.cust_token = localStorage.getItem('cust_token')
  }
  customer_signup() {
    this.loadFlag = true;
    let input_data = {
      emiratesId: this.emiratesId,
      fullname: this.cust_name,
      email: this.cust_email,
      phone: this.mobileNumber,
      country_coded: this.country_code,
      country: this.country_code == '+971' ? 'UAE' : 'INDIA',
    };
    this.auth_service.customer_signup(input_data,this.cust_token).subscribe((rdata: any) => {
      if (rdata.ret_data == 'success') {
        //localStorage.setItem("cust_token",rdata.token);
        localStorage.setItem(
          'customerdata',
          btoa(btoa(JSON.stringify(rdata.cust_info)))
        );
        localStorage.setItem('refresh_number','1')          
        localStorage.setItem('cust_name', btoa(btoa(rdata.cust_info.name)));
        this.router.navigateByUrl('/services');
        this.loadFlag = false;
      }else{
        this.toast.error("Something went wrong")
      }
    });
  }
}
