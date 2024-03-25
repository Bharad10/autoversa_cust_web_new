import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  //user Id
  userId: any;

  //Edit Profile Variables
  custName: any;
  custEmail: any;
  custNumber: any;
  custState: any;
  custAltrenateNumber: any;
  uploadFile: any;
  emiritesId: any;

  //customerData
  custData: any;

  // Booking List

  bookingList:any;
  //Vehicle List
  data: any
  vehicleList: any;
  selected_brand: any;
  vehicle_models: any;
  vehicleBrand: any;
  selected_model: any;
  vehicle_years: any;
  vehicle_variants: any;
  selected_variant: any;
  selected_year: any;
  vehicle_plate_number: any

  //logout Varaible
  logoutVar: boolean = true;


  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.fetchCarModels()
    this.authService.vehicleBrands().subscribe((data) => {
      this.vehicleBrand = data.brands;
      console.log(this.vehicleBrand);
    });
    this.fetchCustomer();
    this.fetchBookingList();
    if ("id" in localStorage) {
      this.logoutVar = true;
    }
    else {
      this.logoutVar = false;
    }
  }

  fetchBookingList() {
    let data = {
      custId: atob(this.userId)
    };
    this.authService.getBookingList(data).subscribe((data) => {
      this.bookingList = data.book_list.map((booking: any) => {
        // Format date
        const bookingDate = new Date(booking.bk_booking_date);
        const formattedDate = bookingDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
  
        // Format time
        const startTime = new Date(`1970-01-01T${booking.tm_start_time}`);
        const endTime = new Date(`1970-01-01T${booking.tm_end_time}`);
        const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
        // Assign formatted values to booking object
        return {
          ...booking,
          formattedDate,
          formattedStartTime,
          formattedEndTime
        };
      });
      console.log("yahoo", this.bookingList);
    });
  }

  fetchCustomer() {
    let data = {
      cust_id: this.userId,
    };
    this.authService.getUser(data).subscribe((data) => {
      this.custData = data.cust_info;
      this.custName = this.custData.cust_fullname;
      this.custEmail = this.custData.cust_email;
      this.custNumber = this.custData.cust_phone;
      this.custState = this.custData.state_name;
      this.emiritesId = this.custData.state_id;
    });


  }

  openProfileEditModal() {
    let modalDiv = document.getElementById('profileEditModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeProfileEditModal() {
    let modalDiv = document.getElementById('profileEditModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  openDeactivateModal() {
    let modalDiv = document.getElementById('deactivateModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeDeactivateModal() {
    let modalDiv = document.getElementById('deactivateModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  openLanguageModal() {
    let modalDiv = document.getElementById('languageModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeLanguageModal() {
    let modalDiv = document.getElementById('languageModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  pictureFile(event: any) {
    this.uploadFile = event.target.files[0];
    console.log(this.uploadFile);
  }

  editProfile() {
    let data = {
      cust_id: atob(this.userId),
      fullname: this.custName,
      custphone: this.custNumber,
      cust_mobile: this.custAltrenateNumber,
      email: this.custEmail,
      cust_profile_pic: '',
      emiratesId: this.emiritesId,
    };
    this.authService.editUserDetails(data).subscribe((data) => {
      console.log(data);
    });
    this.fetchCustomer();
    this.closeProfileEditModal();
  }

  closeaddModal() {
    const modelDiv = document.getElementById('addModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }

  }

  setVehicleBrand(event: any) {
    this.selected_brand = event.target.value;
    let brandData = {
      brand: this.selected_brand,
    };
    this.authService.vehicleModels(brandData).subscribe((data) => {
      this.vehicle_models = data.models;
      console.log('Vehicle Models', data.models);
    });
  }

  setVehicleModel(event: any) {
    this.selected_model = event.target.value;
    this.vehicle_years = [];
    let variantData = {
      brand: this.selected_brand,
      model: event.target.value,
    };
    console.log('variant data-------------------->', variantData);
    this.authService.vehicleVariants(variantData).subscribe((response) => {
      this.vehicle_variants = response.variants;
      console.log('hereeeeeeeee--->', this.vehicle_variants);
    });
  }

  setVehicleVarient(event: any) {
    this.selected_variant = event.target.value;
    this.vehicle_years = [];
    let variantData = {
      brand: this.selected_brand,
      model: this.selected_model,
      varient: this.selected_variant,
    };
    this.authService.vehicleYear(variantData).subscribe((data) => {
      let startDate = data.years[0].from_year;
      let endDate = data.years[0].to_year
      if (endDate == '9999') {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let year = startDate; year <= currentYear; year++) {
          this.vehicle_years.push(year);
        }
      }
      else {
        for (let year = startDate; year <= endDate; year++) {
          this.vehicle_years.push(year);
        }
      }
      console.log("Vehicle Years",this.vehicle_years);
    });
  }

  setVehicleYear(event: any) {
    this.selected_year = event.target.value;
  }

  createModel() {
    let car_info = {
      cv_make: this.selected_brand,
      cv_variant: this.selected_variant,
      cv_year: this.selected_year,
      cv_platenumber: this.vehicle_plate_number,
      custId: atob(this.userId),
      cv_model: this.selected_model,
    };
    this.authService.createCarModel(car_info).subscribe((data) => {
      console.log(data);
    });
    this.vehicle_plate_number = '';
    this.toast.success("Vehicle Added Sucessfully!")
    this.fetchCarModels()
    this.closeaddModal();
  }

  fetchCarModels() {
    let inData = {
      custId: atob(this.userId)
    }
    this.authService.customerVehicleList(inData).subscribe(data => {
      console.log(data);
      this.vehicleList = data.vehList
    })
  }

  openaddModal() {
    const modelDiv = document.getElementById('addModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  logout() {
    localStorage.clear();
    location.reload();
    this.router.navigateByUrl('/')
  }
}
