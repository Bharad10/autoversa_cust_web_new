import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  reqHeader1 = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('cust_token'),
  });

  constructor(private http: HttpClient) {
    console.log(this.reqHeader1);
  }

  // USER API -- START
  sendsignin_otp(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'send_signin_otp', data, {
      headers: this.reqHeader,
    });
  }
  verifysignin_otp(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'verify_signin_otp', data, {
      headers: this.reqHeader,
    });
  }
  customer_emirates_list(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'CommonController/get_statelist_by_country_id',
      data,
      { headers: this.reqHeader }
    );
  }
  customer_signup(data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    return this.http.post(environment.base_url + 'cust_signup', data, {
      headers: headers,
    });
  }
  //Vehicle List
  customerVehicleList(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'customer_vehicle_list',
      data,
      { headers: this.reqHeader1 }
    );
  }

  //Create Vehicle details for form
  vehicleBrands(): Observable<any> {
    return this.http.get(environment.base_url + 'get_vehicle_brands', {
      headers: this.reqHeader1,
    });
  }

  vehicleModels(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'get_vehicle_models', data, {
      headers: this.reqHeader1,
    });
  }

  vehicleVariants(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'get_vehicle_variants', data, {
      headers: this.reqHeader1,
    });
  }

  vehicleYear(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'get_vehicle_varient_years', data, {
      headers: this.reqHeader1,
    });
  }

  //Create Car Model
  createCarModel(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'Customer/CustomerVehicleController',
      data,
      { headers: this.reqHeader1 }
    );
  }

  //Update Car Model
  updateCarModel(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'Customer/CustomerVehicleController/update',
      data,
      { headers: this.reqHeader1 }
    );
  }

  //edit Profile
  editUserDetails(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'customer_update', data, {
      headers: this.reqHeader1,
    });
  }

  //profilePage
  getUser(data: any): Observable<any> {
    return this.http.post(environment.base_url + 'get_customer_by_id', data, {
      headers: this.reqHeader1,
    });
  }

  addAddress(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'Customer/CustomerAddressController',
      data,
      { headers: this.reqHeader1 }
    );
  }

  getBookingList(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'Booking/BookingController/getCustomerBookings',
      data,
      { headers: this.reqHeader1 }
    );
  }

  getBookingHistoryList(data: any): Observable<any> {
    return this.http.post(
      environment.base_url + 'Booking/BookingController/getCustomerBookinghistory',
      data,
      { headers: this.reqHeader1 }
    );
  }
}
