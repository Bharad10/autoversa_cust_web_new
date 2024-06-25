import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.css'],
})
export class AddressPageComponent implements OnInit {
  custAddressData: any;

  customerAddress: any;

  display: any;

  position: any = { lat: 24.453884, lng: 54.3773438 };

  customerId: any;

  placeDetails: any = { city: '', area: '', country: '', verificationCity: '' };

  address: any;

  custId: any;

  addressType: any;

  customerAdressId: any;

  editModalMapPos: any;

  geolocation:any;

  @Input() placeholder = 'Search For Places';

  @ViewChild('inputField', { static: true })
  inputField!: ElementRef<HTMLInputElement>;

  autocomplete: google.maps.places.Autocomplete | undefined;

  map!: google.maps.Map; // Define map variable

  marker: google.maps.Marker | undefined; // Define marker variable
  constructor(
    public adress_service: AddressService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.custId = localStorage.getItem('id');
    this.adressFetch();

    this.getCurrentLocation();
  }

  adressFetch() {
    let data = {
      customerId: atob(this.custId),
    };
    this.adress_service.userAddressFetch(data).subscribe((data) => {
      this.customerAddress = data.cust_addressList;
      console.log(data);
    });
  }

  openAddAddressModal() {
    this.getCurrentLocation();
    this.placeDetails = {
      city: '',
      area: '',
      country: '',
      verificationCity: '',
    };
    this.custAddressData = '';
    this.address = '';
    this.addressType = '';
    const modalDiv = document.getElementById('addressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeAddAddressModal() {
    const modalDiv = document.getElementById('addressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  //Address Modal
  ngAfterViewInit() {
    console.log('google', google);
    console.log('google maps', google.maps);
    console.log('places', google.maps.places);

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputField.nativeElement
      );
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();
        this.position = {
          lat: place?.geometry?.location?.lat(),
          lng: place?.geometry?.location?.lng(),
        };
        if (place && place.address_components) {
          let city, area, sublocality, country;

          for (let component of place.address_components) {
            if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (component.types.includes('sublocality_level_1')) {
              sublocality = component.long_name;
            } else if (
              component.types.includes('administrative_area_level_1')
            ) {
              area = component.long_name;
            } else if (component.types.includes('country')) {
              country = component.long_name;
            }
          }
          console.log('City:', city);
          console.log('Area:', area);
          console.log('country:', country);

          if (sublocality) {
            this.placeDetails = {
              city: sublocality,
              area: area,
              country: country,
              verificationCity: city,
            };
          } else {
            this.placeDetails = {
              city: city,
              area: area,
              country: country,
              verificationCity: city,
            };
          }
        }
        console.log(place);
        this.custAddressData =
          this.placeDetails.city +
          ' ' +
          this.placeDetails.area +
          ' ' +
          this.placeDetails.country;
        console.log(this.position);
      });
    } else {
      console.error('Google Maps API not available');
    }

    this.geolocation = new google.maps.Geocoder();
  }

  clickEvent(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
      // Update marker position
      this.position = {
        lat: this.display.lat,
        lng: this.display.lng,
      };
      // Update marker on the map
      this.updateMarker();
    }
    this.geolocation.geocode({location:this.position},(results:any,status:any)=>{
      this.inputField.nativeElement.value = results[0].formatted_address;
      console.log("location",results[0]);
      let place = results[0]
      if (place && place.address_components) {
        let city, area, sublocality, country;

        for (let component of place.address_components) {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('sublocality_level_1')) {
            sublocality = component.long_name;
          } else if (
            component.types.includes('administrative_area_level_1')
          ) {
            area = component.long_name;
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
        }
        console.log('City:', city);
        console.log('Area:', area);
        console.log('country:', country);

        if (sublocality) {
          this.placeDetails = {
            city: sublocality,
            area: area,
            country: country,
            verificationCity: city,
          };
        } else {
          this.placeDetails = {
            city: city,
            area: area,
            country: country,
            verificationCity: city,
          };
        }
      }
      this.custAddressData =
          this.placeDetails.city +
          ' ' +
          this.placeDetails.area +
          ' ' +
          this.placeDetails.country;
    })
  }

  

  updateMarker() {
    // Remove previous marker if exists
    if (this.marker) {
      this.marker.setMap(null);
    }
    // Add marker at the clicked position
    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
    });
    console.log("Current Position", this.position);
   
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Initialize the map with the current location
          this.map = new google.maps.Map(document.getElementById('map')!, {
            center: this.position,
            zoom: 15,
          });

          // Add marker at current location
          const marker = new google.maps.Marker({
            position: this.position,
            map: this.map,
          });
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }

  addAddress() {
    if (this.address == '' || this.addressType == null) {
      alert('Please Fill the form');
      return;
    }

    if (this.placeDetails.verificationCity.toLowerCase() === 'abu dhabi') {
      let data = {
        countryId: 1,
        stateId: this.placeDetails.area,
        cityId: this.placeDetails.city,
        address: this.custAddressData,
        landmark: this.address,
        add_type: this.addressType,
        lattitude: this.position.lat,
        longitude: this.position.lng,
        cust_id: atob(this.custId),
      };
      this.authService.addAddress(data).subscribe((data) => {
        console.log(data);
      });

      this.closeAddAddressModal();
      this.adressFetch();
      this.toast.success('Adress added successfully');
    } else {
      this.toast.error('Service Only Available in Abu Dhabi');
    }
  }

  onRadioChange(event: any) {
    this.addressType = event.target.value;
  }

  deleteAddress(cad_id: any) {
    let data = {
      cad_id: cad_id,
    };
    this.adress_service.deleteAddress(data).subscribe((data) => {
      console.log(data);
      this.adressFetch();
      if (data.ret_data == 'success') {
         this.toast.warning("Adress deleted")
      }
      else if (data.ret_data == 'fail'){
        this.toast.error(data.msg)
      } 
    });
  }

  openEditAddressModal(data: any) {
    const modalDiv = document.getElementById('editAddressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }

    //setting value to EditAddress
    this.customerAdressId = data.cad_id;

    this.position = {
      lat: Number(data.cad_lattitude),
      lng: Number(data.cad_longitude),
    };

    this.placeDetails = {
      city: data.cad_city,
      area: data.cad_state,
      verificationCity: data.cad_state,
      country: data.country_code,
    };

    this.custAddressData =
      this.placeDetails.city +
      ' ' +
      this.placeDetails.area +
      ' ' +
      this.placeDetails.country;

    this.address = data.cad_landmark;

    this.addressType = data.cad_address_type;
  }

  updateCustomerAddress() {
    let req = {
      addressId: this.customerAdressId,
      countryId: 1,
      stateId: this.placeDetails.area,
      cityId: this.placeDetails.city,
      address: this.custAddressData,
      landmark: this.address,
      add_type: this.addressType,
      lattitude: this.position.lat,
      longitude: this.position.lng,
      cust_id: atob(this.custId),
    };

    this.adress_service.updateCustomeAddress(req).subscribe((data) => {
      console.log(data);
    });

    this.position = { lat: 24.453884, lng: 54.3773438 };
    this.placeDetails = {
      city: '',
      area: '',
      country: '',
      verificationCity: '',
    };
    this.custAddressData = '';
    this.address = '';
    this.addressType = '';

    this.adressFetch();
    this.closeEditAddressModal();
    this.toast.success('Address updated successfully');
  }

  closeEditAddressModal() {
    const modalDiv = document.getElementById('editAddressModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }
}
