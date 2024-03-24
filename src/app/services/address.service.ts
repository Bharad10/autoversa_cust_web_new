import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  reqHeader = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('cust_token')});
  private apiKey = 'AIzaSyCMBcZcBYFb0iCEKh4ntoRFF4LtVnnAMYo';
  constructor(private http: HttpClient) {

   }

    //User AddressFetch
    userAddressFetch(data:any):Observable<any>{
      return this.http.post(environment.base_url + 'Customer/CustomerAddressController/index',data,{headers: this.reqHeader})
    }

    getPlaceDetails(latitude: number, longitude: number): Observable<any> {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
      return this.http.get(url);
    }

    deleteAddress(data:any):Observable<any> {
      return this.http.delete(environment.base_url + 'Customer/CustomerAddressController/delete' , {headers:this.reqHeader,
        params:data
      } )
    }

    updateCustomeAddress(data:any):Observable<any>{
      return this.http.post(environment.base_url + 'Customer/CustomerAddressController/update', data, {headers:this.reqHeader})
    }
}
