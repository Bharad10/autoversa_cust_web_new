import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list-page',
  templateUrl: './vehicle-list-page.component.html',
  styleUrls: ['./vehicle-list-page.component.css']
})
export class VehicleListPageComponent implements OnInit {
  data: any[] = [];
  selected_brand : any ;
  selected_model : any ;
  selected_variant: any;
  selected_year: any;
  vehicle_plate_number: any;
  selected_id_to_edit : any;
  vehicleBrand: any[] = [];
  vehicle_models: any[] = [];
  vehicle_variants: any[] = [];
  vehicle_years: any[] = [];
  customerId:any;
  constructor(private auth_service : AuthService, private toast:ToastrService){
    console.log(this.selected_brand);
    
  }

  ngOnInit(): void {

    this.customerId = localStorage.getItem('id');

    this.fetchCarModels();

    this.auth_service.vehicleBrands().subscribe((data) => {
      this.vehicleBrand = data.brands;
      console.log(this.vehicleBrand);
    });
  }

  fetchCarModels() {
    let inData = {
      custId: atob(this.customerId),
    };
    this.auth_service.customerVehicleList(inData).subscribe((fetched_data) => {
      this.data = fetched_data.vehList;
      console.log(this.data);
    });
  }

  openaddModal() {
    const modelDiv = document.getElementById('addModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeaddModal() {
    const modelDiv = document.getElementById('addModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  openeditModal(cv_id: any) {
    const modelDiv = document.getElementById('editModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    let filterdVehicleData = this.data.filter((data) => {
      return (data = data.cv_id == cv_id);
    });

    this.selected_brand = filterdVehicleData[0].cv_make;
    this.selected_variant = filterdVehicleData[0].cv_variant;
    this.selected_year = filterdVehicleData[0].cv_year;
    this.vehicle_plate_number = filterdVehicleData[0].cv_plate_number;
    this.selected_id_to_edit = cv_id;
    this.selected_model = filterdVehicleData[0].cv_model;
  }

  closeeditModal() {
    const modelDiv = document.getElementById('editModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  setVehicleBrand(event: any) {
    this.selected_brand = event.target.value;
    let brandData = {
      brand: this.selected_brand,
    };
    this.auth_service.vehicleModels(brandData).subscribe((data) => {
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
    this.auth_service.vehicleVariants(variantData).subscribe((response) => {
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
      varient:this.selected_variant
    };
    this.auth_service.vehicleYear(variantData).subscribe((data) => {
      let startDate = data.years[0].from_year;
      let endDate = data.years[0].to_year 
      if ( endDate == '9999') {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let year = startDate; year <= currentYear; year++) {
          this.vehicle_years.push(year);
        }
      }
      else{
        for (let year = startDate; year <= endDate; year++) {
          this.vehicle_years.push(year);
        }
      }
      console.log(data);
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
      custId: atob(this.customerId),
      cv_model: this.selected_model,
    };
    this.auth_service.createCarModel(car_info).subscribe((data) => {
      console.log(data);
    });

    this.vehicle_plate_number = '';

    this.fetchCarModels();

    this.toast.success("Vehicle Added Sucessfully!")

    this.closeaddModal();
  }

  updateModal() {
    let updateData = {
      cv_make: this.selected_brand,
      cv_model: this.selected_model,
      cv_variant: this.selected_variant,
      cv_year: this.selected_year,
      custvehId: this.selected_id_to_edit,
      cv_platenumber: this.vehicle_plate_number,
      cv_cust_id: atob(this.customerId)
    };

    console.log('updateData--------------------------------', updateData);

    this.auth_service.updateCarModel(updateData).subscribe((data) => {
      console.log(data);
    });

    this.vehicle_plate_number = '';

    this.fetchCarModels();

    alert('Vehicle Updated SucessFully');

    this.closeeditModal();
  }
 

  
}


