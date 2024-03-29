import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  reqHeader = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('cust_token')});
  

  constructor(private http: HttpClient) {
   }

  get_bookingPackages(): Observable<any> {
    return this.http.get(environment.base_url + 'Package/PackageController', {headers : this.reqHeader});
  }
  GetpackagebyId(package_id:any): Observable<any> {
    return this.http.get(environment.base_url + 'Package/PackageController/'+package_id, {headers : this.reqHeader});
  }
  GetcustomerAddresses(custId:any): Observable<any> {
    return this.http.post(environment.base_url + 'Customer/CustomerAddressController/get_customer_addresses',custId, {headers : this.reqHeader});
  }
  getpickupOptions(): Observable<any> {
    return this.http.get(environment.base_url + 'System/PickupTypeController', {headers : this.reqHeader});
  }
  gettimeslotsbyDate(custId:any): Observable<any> {
    return this.http.post(environment.base_url + 'Get_availabletimeslotby_id',custId, {headers : this.reqHeader});
  }
  getVehiclePackageInfo(data: any) {
    return this.http.post(environment.base_url + 'Package/GetVehiclePackage', data, {headers : this.reqHeader});
  }
  create_booking(data: any) {
    return this.http.post(environment.base_url + 'Booking/BookingController', data, {headers : this.reqHeader});
  }

  //Package Contoller For Service Landing Page
  allServicesListedForLandingPage():Observable<any>{
    return this.http.get(environment.base_url + `get_services`, {headers: this.reqHeader})
  }
  GetbookingdetailsbyId(data: any) {
    return this.http.post(environment.base_url + 'Booking/BookingController/getbookingdetails_forcustomer', data, {headers : this.reqHeader});
  }
  GetCustomerbookings(data: any) {
    return this.http.post(environment.base_url + 'Booking/BookingController/getCustomerBookings', data, {headers : this.reqHeader});
  }
  GetBookingJobDetails(data: any) {
    return this.http.post(environment.base_url + 'Booking/BookingController/Get_jobdetails_bybkid', data, {headers : this.reqHeader});
  }

  getCustomerBookings(data:any):Observable<any>{
    return this.http.post(environment.base_url + 'getCustomerBookings',data, {headers: this.reqHeader})
  }

  getbookingDetails():Observable<any>{
    return this.http.get(environment.base_url + 'System/PickupTypeController', {headers:this.reqHeader})
  }

  getbookingTime(data:any):Observable<any>{
    return this.http.post(environment.base_url + 'Get_availabletimeslotby_id',data,{headers:this.reqHeader})
  }

  getCouponsForCustomer(data:any): Observable<any>{
    return this.http.post(environment.base_url + 'get_couponsforcustomer',data, {headers : this.reqHeader});
  }
  JobstatusChange(data:any): Observable<any>{
    return this.http.post(environment.base_url + 'Booking/BookingController/multiple_Job_status_update_bycust',data, {headers : this.reqHeader});
  }
  bookingHoldStatusChange(data:any): Observable<any>{
    return this.http.post(environment.base_url + 'Booking/BookingController/hold_booking',data, {headers : this.reqHeader});
  }
  

}
